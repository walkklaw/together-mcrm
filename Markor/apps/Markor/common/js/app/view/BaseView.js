define([
  'backbone',
  'promise' ], function(Backbone, P) {

  var BaseView = Backbone.View.extend({

    // Load collection data
    loadColl : function(collection, data) {
      return new Promise(function(resolve, reject) {
        collection.fetch({
          data: data,
          success : function() {
            resolve && resolve();
          },
          error : function() {
            reject && reject();
          }
        });
      });
    },
    
    // Load collection data
    createInColl : function(collection, data) {
      return new Promise(function(resolve, reject) {
        collection.create({
          data: data,
          success : function() {
            resolve && resolve();
          },
          error : function() {
            reject && reject();
          }
        });
      });
    },

  }, {
    parameters: null,
  });

  return BaseView;
});