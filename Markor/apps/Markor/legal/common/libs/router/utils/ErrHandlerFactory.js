define([ "Loading", "Alerting" ], function(Loading, Alerting) {

  return {

    getBackboneErrHandler : function(type, options) {
      return function(xhr, textStatus, errorThrown) {
        
        // Get error message according to the error type
        function getErrMsg(xhr, errMsgs) {
          var errorType = xhr.statusText === "timeout" ? "timeout"
            : (xhr.status >= 500 ? "server" : (xhr.status === 0
              || xhr.status === 404 ? "network" : "default"));
          return errMsgs ? errMsgs[errorType] : "";
        }
        var opts = options;
        var errMsg = getErrMsg(xhr, opts.errMsgs);

        // hide the loading icon
        Loading.hide("Loading...");

        // According to the type to show different alert dialog
        (type === "retry" ? Alerting.showRetryAlert : Alerting.showAlert).call(
          Alerting, errMsg, opts.ok, opts.cancel);
      };
    }

  };

});
