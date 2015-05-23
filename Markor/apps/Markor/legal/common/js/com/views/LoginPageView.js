define([

"jquery", "backbone", "PageView", "Router",
// "com/utils/AuthenticationUtils"

], function($, Backbone, PageView, Router, AuthenticationUtils) {

  // Extends PagView class
  var LoginPageView = PageView.extend({

    // Event handlers for page view
    events : {
      "tap #signinBtn" : "login",
    },

    // Override the base view's
    onBackButton : function() {
      $(document).off("backbutton").on("backbutton", function() {
        Router.navigate("back");
      });
    },

    /**
     * Do do login with the credentials provided by the user
     */
    login : function() {
      var userName = $("#username").val();
      var password = $("#password").val();

      var opts = {};
      opts.params = {};
      opts.params.username = userName;
      opts.params.password = password;
      
      //login
//      AuthenticationUtils.submitAuthentication(opts);
      
      //navigate to home page if login succeeded
      Router.navigate("switch/home.html");
    },

    render : function() {
      // Display previously used username, 
      $("#username").val("rtsmith");
      $("#password").val("admin322");

      PageView.prototype.render.call(this);
      return this;
    },

  });

  // Returns the View class
  return LoginPageView;

});
