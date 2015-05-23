define([

"jquery", "backbone", "com/models/Constants", "PageView", "com/utils/Utils",
  "Router", "SideMenuPanel",
// "com/utils/AuthenticationUtils"
], function($, Backbone, Constants, PageView, Utils, Router, SideMenuPanel) {

  // Extends PagView class
  var HomePageView = PageView.extend({

    // Event handlers for page view
    events : {
      "tap #logoutBtn" : "logout",
      "tap .messageBtn" : "showMsgs",
    },

    // override base view's, need to invoke the parent view's initialize
    initialize : function() {
      PageView.prototype.initialize.apply(this, arguments);
      return this;
    },

    // Override the base view's
    onBackButton : function() {
      // logout on back button
      $(document).off("backbutton").on("backbutton", function() {
        Router.navigate("back");
      });
    },

    // Override the base view's, need to invoke the parent view's render
    render : function() {
      // Insert a side menu
      this.sideMenu = new SideMenuPanel().render(this, "Home");

      PageView.prototype.render.call(this);
      return this;
    },

    logout : function() {
      var opts = {};
      opts.onSuccess = function() {
        Router.navigate("switch/login.html", {
          transition : "none",
        });
      };
      // AuthenticationUtils.logout(opts);
    },

    showMsgs : function() {
      Router.navigate("messageModule/message_center.html", {
        transition : "pop",
        // Data passed to the target page
        data : {
          userId : 1,
        }
      });
      return false;
    },

  });

  // Returns the View class
  return HomePageView;

});