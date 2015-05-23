define([

"jquery", "backbone", "MenuLinkModel",

], function($, Backbone, MenuLinkModel) {

  var MenuLinkModelsCollection = Backbone.Collection.extend({

    model : MenuLinkModel,

  });

  return MenuLinkModelsCollection;

});
