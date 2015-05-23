define([ "Config" ],

function(Config) {

  return {

    showConfirmationAlert : function(question, onYes, onNo, title, labels) {
      // title = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);
      title = title || Config.DEFAULT_TITLE;

      labels = labels || Config.DEFAULT_COMFIRM_LABEL;

      var onConfirm = function(index) {
        if (index === 2) {
          onYes && onYes();
        } else {
          onNo && onNo();
        }
      };

      if (navigator.notification) {
        // Run on device, so use the codovar api
        navigator.notification.confirm(question, onConfirm, title, labels);
      } else {
        // Run on browser, then use browser api, browse return > 0 means yes
        onConfirm(confirm(question) ? 2 : 0);
      }
    },

    showRetryAlert : function(message, onYes, onNo) {
      this.showConfirmationAlert(message, onYes, onNo, null, Config.DEFAULT_RETRY_LABEL);
    },

    showAlert : function(message, onOk, title, buttonName) {
      title = title || Config.DEFAULT_TITLE;

      buttonName = buttonName || Config.DEFAULT_ALERT_LABEL;

      if (navigator.notification) {
        // Run on device, so use the codovar api
        navigator.notification.alert(message, onOk, title, buttonName);
      } else {
        // Run on browser, then use browser api
        alert(message);
        onOk && onOk();
      }
    }
  };

});
