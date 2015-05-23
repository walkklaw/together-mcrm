define(

  [ "backbone", "localStorage", "Config", "Alerting", "Loading", "Helpers",
    "ErrHandlerFactory", ],

  function(Backbone, LocalStorage, Config, Alerting, Loading, Helpers,
    ErrHandlerFactory) {

    var defaultErrorMsgs = Config.DEFAULT_ERROR_MESSAGES;

    // Invoke the procedure of adapter to send request, so need to encapsulate
    // the options for procedure invoking
    function invokeAdapter(options) {
      var parameters, procudure, invocationData;
      var onResponse = function(response) {
        if (response.invocationResult.statusMessage === "OK") {
          options.onSuccess
            && options.onSuccess(response.invocationResult.data);
        } else {
          // Show error message
          options.onFailure && options.onFailure(response);
        }
      };

      procudure = options.procedure;
      if (!procudure) {
        throw "Need to input procudure";
        return;
      }
      // If invoke the authentication adapter, need to add suffix to the
      // procedure
      procudure = procudure
        + (options.security || ApiUtils.security ? ApiUtils.securitySuffix : "");

      parameters = [ _.pick(options.parameters, "path") ];
      if (options.method === "create" || options.method === "update") {
        parameters.push(options.model.toJSON());
      }

      invocationData = {
        adapter : options.adapter,
        procedure : procudure,
        parameters : parameters,
      };

      // Encapsulate options for invoking procedure
      var opts = {
        onSuccess : onResponse,
        timeout : Number(options.timeout || Config.DEFAULT_TIMEOUT) * 1000,
        onFailure : function(response) {
          var error = options.onError;
          switch (response.errorCode) {
          case "PROCEDURE_ERROR":
            response.status = 500;
            break;
          case "REQUEST_TIMEOUT":
            response.statusText = "timeout";
            break;
          default:
            response.status = 0;
            break;
          }
          error && error(response);
        }
      };

      WL.Client.invokeProcedure(invocationData, opts);
    }

    // Proxy of Backbone Model and Collection to invoke their 'C/R/U/D' methods
    // options: {model, method, success, error, data, apiType, url, timeout}
    function invokeBackboneMethods(options) {
      var method;
      var baseObj;
      var args = [];
      var modelOrColl = options.model;
      var optMethod = options.method;
      var data = options.data;
      // Encapsulate options for ajax
      var defaultAjaxOption = {
        beforeSend : function(xhr) {
          xhr.setRequestHeader("Accept",
            "application/com.ibm.mobilecoc.coordinatedcare-v1.0+json");
        },
        timeout : Config.DAFAULT_TIMEOUT,
        dataType : "json",
        dataFilter : function(resp) {
          try {
            return JSON.stringify(JSON.parse(resp).data);
          } catch (e) {
            return "";
          }
        }
      };
      var methodOptions = _.extend({}, defaultAjaxOption, _.pick(options,
        "success", "error", "url", "timeout", "apiType", "wlapiOpts"));

      // init the arguments for method
      if (modelOrColl.model) {
        baseObj = Backbone.Collection.prototype;
        switch (optMethod) {
        case "R":
          method = "fetch";
          methodOptions = _.extend({}, methodOptions, {
            data : data
          });
          break;
        case "C":
          method = "create";
          args.push(data);
          break;
        default:
          throw new Error("Collection has no such method.");
        }
      } else {
        baseObj = Backbone.Model.prototype;
        switch (optMethod) {
        case "R":
          method = "fetch";
          break;
        case "D":
          method = "destroy";
          break;
        // post and put request need to add the data attr
        case "C":
        case "U":
          method = "save";
          data && args.push(data);
          break;
        default:
          throw new Error("Model has no such method.");
        }
      }
      args.push(methodOptions);

      baseObj[method].apply(modelOrColl, args);
    }

    // Check the business error code before invoke the success handler
    function checkErrorCode(businessHanlder, success) {
      return function(resp) {
        try {
          if ((resp.statusCode && resp.statusCode !== "0")
            || (resp.errorCode && resp.errorCode !== "0")) {
            businessHanlder ? businessHanlder(resp.statusMessage) : Alerting
              .showAlert(resp.statusMessage, function() {
              });
          }
          resp = resp.data;
        } catch (e) {
          resp = {};
          throw "Response data formatter is wrong!";
        } finally {
          success(resp);
          Loading.hide("Processing...");
        }
      };
    }

    // Backbone.localstorage would assign the original backbone sync to
    // ajaxSync, save the original sync to originSync and override the ajaxSync
    Backbone.originSync = Backbone.ajaxSync;
    Backbone.ajaxSync = function(method, model, options) {
      var errorMsgs = options.errorMessage || defaultErrorMsgs;
      
      // Business error handler, if not assign use the default one to show alert
      var busiErrHanlder = options.bussError || function(statusMessage) {
        Alerting.showAlert(statusMessage, function() {
        });
      };

      function sync() {
        var opts = $.extend(true, {}, options);
        // Show loading icon
        Loading.show("Processing...");
        Backbone.originSync(method, model, opts);
      }

      // Chcke the error business code before call success
      options.success = checkErrorCode(busiErrHanlder, options.success);

      // Default error handler can get from ErrHandlerFactory, it would show
      // a dialog with retry button
      options.error = options.errHandler
        || ErrHandlerFactory.getBackboneErrHandler("retry", {
          errMsgs : errorMsgs,
          ok : sync,
          alert : Alerting.showRetryAlert,
        });

      // Check the connection before send request
      Helpers.connectionHandler(errorMsgs.network, sync);
    };

    // Invoke adapter procedure to send request
    Backbone.wlapiSync = function(method, model, options) {
      invokeAdapter({
        model : model,
        adapter : options.wlapiOpts.adapter,
        procedure : options.wlapiOpts.procedure,
        parameters : {
          params : options.params,
          path : options.url
        },
        onSuccess : options.success,
        onError : options.error,
        method : method,
      });
      model.trigger('request', model, null, options);
    };

    // Choose a sync according to the request type
    Backbone.getSyncMethod = function(options) {
      var sync = {
        wlapi : Backbone.wlapiSync,
        localApi : Backbone.localSync,
        ajax : Backbone.ajaxSync,
      }[options.apiType];
      return sync || Backbone.ajaxSync;
    };

    // Override 'Backbone.sync' to choose sync by api type,
    Backbone.sync = function(method, model, options) {
      return Backbone.getSyncMethod(options).apply(this,
        [ method, model, options ]);
    };

    var ApiUtils = {
      invokeBackboneMethods : invokeBackboneMethods,

      security : false,

      securitySuffix : "",

      // Proxy of Backbone Model and Collection to invoke their 'C/U/R/D'
      // methods,
      // add common error handler, show and hide loding icon
      apiCall : function(opts) {
        // opts: {model: this, apiType: "ajax", onSuccess: onSuccess, params:
        // params, options:
        // {restUrl: modelBaseUrl + '/' + params.userId, method: 'C', procedure:
        // procedure}}
        var success = opts.onSuccess;
        var self = this;
        var errorMsgs = opts.errorMessage || {};

        function conectionAvailable() {
          var options = opts.options;
          // Show loading icon
          Loading.show("Processing...");

          // Invoke backbone method to send request
          invokeBackboneMethods(_
            .extend(
              {},
              {
                model : opts.model,
                method : options.method,
                success : function() {
                  // show the loading icon
                  Loading.hide("Processing...");

                  success && success.apply(this, arguments);
                },
                data : opts.params,
                apiType : opts.apiType,
                url : options.restUrl,
                error : function(model, xhr, options) {
                  var errorType = xhr.statusText === "timeout" ? "timeout"
                    : (xhr.status >= 500 ? "server" : "default");
                  var errorMsg = _.extend({}, defaultErrorMsgs, errorMsgs)[errorType];

                  // show the loading icon
                  Loading.hide("Processing...");

                  Alerting.showRetryAlert(errorMsg, function() {
                    self.apiCall(opts);
                  }, function() {
                  });
                },
                timeout : opts.timeout,
                wlapiOpts : opts.options,
              }));
        }

        Helpers.connectionHandler(errorMsgs.network, conectionAvailable);
      }

    };

    // If this api is used on prototype then just invoke the success callback
    if (Config.PROTOTYPE) {
      ApiUtils.apiCall = function(opts) {
        opts && opts.onSuccess && opts.onSuccess();
      };
    }

    return ApiUtils;
  });