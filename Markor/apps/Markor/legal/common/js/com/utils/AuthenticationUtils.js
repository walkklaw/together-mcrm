define(
  [

  "jquery", "backbone", "com/models/Constants", "com/utils/Utils",

  ],
  function($, Backbone, Constants, Utils) {
    var adapterBasedAuthRealmChallengeHandler = WL.Client
      .createChallengeHandler("AdapterBasedAuthRealm");

    /*
     * Get authentication response and invoke challenge handler.
     */
    adapterBasedAuthRealmChallengeHandler.isCustomResponse = function(response) {
      if (!response || !response.responseJSON || response.responseText === null) {
        return false;
      }
      if (typeof (response.responseJSON.authRequired) !== 'undefined') {
        return true;
      } else {
        return false;
      }
    };

    /*
     * Handle with Validation response
     */
    adapterBasedAuthRealmChallengeHandler.handleChallenge = function(response) {
      var authRequired = response.responseJSON.authRequired;

      if (authRequired == true) {
        // Authentication has not passed
        Utils
          .showAlert(
            response.responseJSON.errorMessage,
            function() {
              if (response.responseJSON.errorMessage == "You are not authorized to visit this resource.") {
                $.mobile.changePage("login.html", {
                  transition : "none"
                });
              }
              // Loading.hide();
              adapterBasedAuthRealmChallengeHandler.submitFailure();
            });
      } else if (authRequired == false) {
        // Authentication has passed
        // Add UserId to Session Storage
        WL.Client.login("AdapterBasedAuthRealm", {});
        $.mobile.changePage("home.html", {
          transition : "none"
        });
        // adapterBasedAuthRealmChallengeHandler.submitSuccess();
      }
    };

    var AuthenticationUtils = Backbone.Model.extend({},

    {
      /**
       * SubmitAuthentication
       * 
       * @param opts
       */
      submitAuthentication : function(opts) {
        var invocationData = {
          adapter : "UserAdapter",
          procedure : "submitAuthentication",
          parameters : [ opts.params.username, opts.params.password ]
        };
        adapterBasedAuthRealmChallengeHandler.submitAdapterAuthentication(
          invocationData, {});
      },

      /**
       * Logout
       * 
       * @param opts
       */
      logout : function(opts) {
        var message = Utils.getTranslation("%home.logout.question%");
        var title = Utils.getTranslation("%home.logout.title%");

        var onYes = function() {
          WL.Client.logout('AdapterBasedAuthRealm', {
            onSuccess : opts.onSuccess
          });
        };

        var onNo = function() {
          // Do nothing
        };

        Utils.showConfirmationAlert(message, onYes, onNo, title, "No,Yes");
      },

      /**
       * Get the current Login User
       * 
       */
      getLoggedUserId : function() {
        return WL.Client.getUserInfo("AdapterBasedAuthRealm", "userId");
      },

    });

    return AuthenticationUtils;

  });