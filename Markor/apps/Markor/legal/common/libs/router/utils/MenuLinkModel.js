define([

"jquery", "backbone",

], function($, Backbone) {

  var MenuLinkModel = Backbone.Model.extend({

    defaults : {
      "name" : "",
      "link" : "",
    // "excludeRole": "",
    // "isCurrent": false,
    },

  });

  return MenuLinkModel;

});