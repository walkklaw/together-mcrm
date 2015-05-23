/**
 * this class create the splash screen
 */
define([

"jquery", "backbone", "PageView", "Router",

], function($, Backbone, PageView, Router) {

  // Extends PagView class
  var ContactPageView = PageView.extend({

    // Event handlers for page view
    events : {
      "tap #back" : "back",
    },

    back : function() {
      Router.navigate("back");
    },

  });

  // Returns the View class
  return ContactPageView;

});