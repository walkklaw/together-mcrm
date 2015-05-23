define([ "Config", "Alerting", ],

function(Config, Alerting) {

  'use strict';

  var defErrorMessages = Config.DEFAULT_ERROR_MESSAGES;

  // Check whether the connection is available
  function isConnectionAvailable() {
    // Here we return true to make it convient for testing using web, and
    // also it will not impcat the function.
    var connection = navigator.connection;
    return !(connection && connection.type === Connection.NONE);
  }

  function connectionCheck(success, fail) {
    if (isConnectionAvailable()) {
      success && success();
    } else {
      fail && fail();
    }
  }

  return {

    // Check whether the connection is available, if available then call
    // success, else show alert dialog with retry and cancel button,
    // if click cancel then call cancel
    connectionHandler : function(message, success, cancel) {
      var args = arguments;
      var self = this;
      message = message || defErrorMessages.network;

      connectionCheck(success, function() {
        // Retry handler for the dialog
        var onYes = function onYes() {
          self.connectionHandler.apply(self, args);
        };
        Alerting.showRetryAlert(message, onYes, cancel);
      });
    },

  };

});
