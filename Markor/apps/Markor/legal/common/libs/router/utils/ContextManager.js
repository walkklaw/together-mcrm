define([], function() {

  // Manage the page contexts
  var ContextManager = function() {
    this.contexts = {};
  };

  ContextManager.method("save", function(url, context) {
    
    var contexts = this.contexts;
    var contextArray = contexts[url] = contexts[url] || [];
    context = context || {};
    
    // Save the context to restore
    this.currentContextArray = contextArray;
    contextArray.push(context);
    
  }).method("get", function(url) {
    
    var contextArray = url ? this.contexts[url] : this.currentContextArray;
    var length = contextArray.length;
    
    return contextArray && length && contextArray[length - 1];
    
  }).method("pop", function(url) {
    
    var contextArray = url ? this.contexts[url] : this.currentContextArray;
    return contextArray && contextArray.pop();
    
  }).method("restore", function() {
    
    this.currentContextArray.pop();
    
  });

  return ContextManager;
});