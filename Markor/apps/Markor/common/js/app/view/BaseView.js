define([
  'backbone',
  'promise' ], function(Backbone, P) {

  var BaseView = Backbone.View.extend({

    // Load collection data
    loadColl : function(collection) {
      return new Promise(function(resolve, reject) {
        collection.fetch({
          success : function() {
            resolve();
          },
          error : function() {
            reject();
          }
        });
      });
    },

  }, {
    parameters: null,
  });

  return BaseView;
});