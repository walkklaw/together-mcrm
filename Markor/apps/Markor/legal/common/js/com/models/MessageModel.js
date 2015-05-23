define([

"jquery", "backbone", "moment",

], function($, Backbone, moment) {

  var MessageModel = Backbone.Model.extend({

    urlRoot : "http://9.16.172.108:4002/messages",

    defaults : {
      "subject" : "",
      "from" : "",
      "date" : moment().format("YYYY-MM-DD"),
      "content" : "",
      "isRead" : true,
      "actionRequired" : false,
      "userId" : "",
      "accepted" : false,
      "type" : "",
    },

    initialize : function(attributes, options) {
      this.set({
        "isMedication" : attributes["type"] == "Medication"
      });
    },

    read : function() {
      this.set({
        "unread" : false,
        "urgent" : false
      });
    },

    accept : function() {
      this.set({
        "accepted" : true
      });
    },

  }, {
    ID_SEQ : 0,
  });

  return MessageModel;

});