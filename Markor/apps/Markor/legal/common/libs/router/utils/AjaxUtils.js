define([ "jquery", ], function($) {

  return {

    getJSONData : function(file, onResultHandler, async) {
      $.ajax({
        type : "GET",
        url : file,
        async : typeof async == "undefined" ? true : async,
        cache : true,
        dataType : "json",
        success : function(data) {
          if (onResultHandler) {
            onResultHandler(data);
          }
        },
        error : function(data) {
          console.log("Failed to get json data ");
        }
      });
    },

  };

});
