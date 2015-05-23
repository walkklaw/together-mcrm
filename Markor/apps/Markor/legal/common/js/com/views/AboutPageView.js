/**
 * this class create the splash screen
 */
define([

"jquery", "backbone", "cftoaster", "PageView", "com/models/Constants",
  "com/utils/Utils", "Router",

], function($, Backbone, CFToaster, PageView, Constants, Utils, Router) {

  // Extends PagView class
  var AboutPageView = PageView.extend({

    // Event handlers for page view
    events : {
      "tap #continueBtn" : "next",
      "tap #contact" : "contact",
    },

    next : function() {
      Router.navigate("switch/login.html", {
        transition : "none",
      });
    },

    contact : function() {
      Router.navigate("switch/contact.html", {
        transition : "none",
      });
    },

    // Override the base view's
    onBackButton : function() {
      // kill the app on back button
      $(document).off("backbutton").on("backbutton", function() {
        Router.navigate("exit");
      });
    },

    initialize : function() {
      PageView.prototype.initialize.apply(this, arguments);

      //Hide the splash screen. By default, Worklight will hide the splash screen automatically. 
      //This can be changed by setting autoHideSplash to false in initOptions.js. By doing so,
      //the splash screen should be hidden by ourselves. Here we hide it after all initialization
      //completes and the first page, i.e., Splash Page, loaded. 
      window.WL && WL.App.hideSplashScreen();
      
      // populate the version number before the page is shown
      var version = window.WL && WL.Client.getAppProperty(WL.AppProperty.APP_VERSION);
      version = version || "1.0";
      this.$("#version").text("v. " + version);

      
      return this;
    },

    render : function() {
      PageView.prototype.render.apply(this, arguments);
      return this;
    },

  });

  // Returns the View class
  return AboutPageView;

});