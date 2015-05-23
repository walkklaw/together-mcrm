define(
  [ "Config", "Alerting", "ApiUtils", "Router", "Loading", "Helpers", ],

  function(Config, Alerting, ApiUtils, Router, Loading, Helpers) {

    'use strict';

    var defErrorMessages = Config.DEFAULT_ERROR_MESSAGES;

    return {

      loadPageData : function(view, modelAndCollections, afterLoadData,
        errorMessages) {
        var len = modelAndCollections.length;
        var oldModelsAndColls = {};

        function errCancel() {
          Loading.hide("Loading...");
          Router.navigate("back");
        }

        // Load each model or collection for page
        function loadData() {
          var length = len;
          var timesFunc = _.after(length, loadedData);
          var modelOrCollection;
          var param;
          var model;
          var opts;
          var errorType = null;

          // After invoke loadedData length times, will handle the error or call
          // back the success function
          function loadedData() {
            function onOk() {
              detectAndLoad();
            }

            if (errorType) {
              var errorMsg = _.extend({}, defErrorMessages, errorMessages)[errorType];

              // Restore the old model and collections for view
              for ( var name in oldModelsAndColls) {
                view[name] = oldModelsAndColls[name];
              }

              Alerting.showRetryAlert(errorMsg, onOk, errCancel);
            } else {
              afterLoadData();
            }
          }

          // Fetch each model or collection data
          for ( var i = 0; i < length; i++) {
            modelOrCollection = modelAndCollections[i];
            param = modelOrCollection.params;
            model = view[modelOrCollection.name] = new modelOrCollection.objClass();
            opts = model.initOpts && model.initOpts(param);
            opts = opts || {};

            model.fetch({
              url : opts.restUrl,
              apiType : opts.apiType,
              timeout: opts.timeout,
              data : param,
              success : function(model, resp, options) {
                timesFunc();
              },
              errHandler : function(xhr, textStatus, errorThrown) {
                errorType = xhr.statusText === "timeout" ? "timeout"
                  : (xhr.status >= 500 ? "server" : (xhr.status === 0
                    || xhr.status === 404 ? "network" : "default"));
                timesFunc();
              },
            });
          }
        }

        function detectAndLoad() {
          // Detect the connection
          Helpers.connectionHandler(defErrorMessages.network, loadData,
            errCancel);
        }

        if (len) {
          // Save the old models and collections for view to restore after
          // fail loading data
          _.map(_.pluck(modelAndCollections, "name"), function(name) {
            oldModelsAndColls[name] = view[name];
          });

          detectAndLoad();
        } else {
          afterLoadData();
        }
      },
    };

  });
