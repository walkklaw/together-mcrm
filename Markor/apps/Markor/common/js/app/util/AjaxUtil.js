define([], function() {
  
  return {
    getJSON: function(url, dataHandler){
      var xhr = new XMLHttpRequest();
      
      xhr.open('GET', url);
      
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          dataHandler && dataHandler(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(null);
    },
  };

});