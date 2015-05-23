define([

"jquery", "backbone", "com/models/Constants", "com/models/MessageModel",

], function($, Backbone, Constants, MessageModel) {

  var MessageModelsCollection = Backbone.Collection.extend({

    url : "http://9.16.172.108:4002/messages",

    initialize : function(models, options) {
    },

    // Initialize the options for ajax request during load data
    initOpts: function(params){
      return {
//        timeout: 25,
      };
    },
    
    comparator : function(activity) {
      return activity.get("date");
    },
    
    model : MessageModel,
  });

  return MessageModelsCollection;

});
