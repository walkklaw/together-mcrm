define([ "jquery", "backbone", "Config", "ContextManager", "Helpers",
  "Alerting", ],

function($, Backbone, Config, ContextManager, Helpers, Alerting) {

  'use strict';

  if (Config.IS_WIREFRAME) {
    $.mobile.changePage("pages/" + Config.START_PAGE);
    $(document).on("pageshow", function() {

      // trigger to fix JQM page height
      $(window).trigger("resize");

    });
    $(window).on("resize", function() {
      // fix JQM applying min-height to pages on show, only fix
      // for pages without headers and footers
      var page = $("div[data-role=page]").last();
      var doFix = $(page)
        .find("div[data-role=header], div[data-role=footer]").size() == 0;

      if (doFix) {
        $(page).css("min-height", "100%");
        setTimeout(function() {
          $(page).css("min-height", "100%");
        }, 250);
      }
    });
    return {};
  }

  var Router = Backbone.Router.extend({

    routes : Config.PAGES_ROUTES,

    // Reference of the created page view
    views : {},

    // Reference of the page view classes
    viewClasses : {},

    // Reference of the current page such as home.html
    currentPage : "",

    // ContextManager is used to manage the contexts of all pages
    contextManager : new ContextManager(),

    // Override the default navigate and save the navigate options here
    naviOpts : {},

    initialize : function() {
      // Get all the view class
      var views = _.values(Config.PAGES_VIEWS);
      var that = this;

      // Register JQM events handlers
      $(document).on(
        "pagebeforecreate",
        function onPageBeforeCreate(event) {
          // The 'pagebeforecreate' event Handler, create the new page views
          // or initialize the existed page view

          var self = that;
          var currentPage = self.currentPage;
          var views = self.views;
          var currentView = views[currentPage];
          var page = event.target;
          var options = {
            data : self.contextManager.get().data,
            element : page && $(page).attr("id"),
          };

          if (!currentView) {
            var ViewClass = self.viewClasses[currentPage];
            if (!ViewClass) {
              console.error("PageView Class needs to be added to Config."
                + "PAGES_VIEWS!");
            } else {
              views[currentPage] = new ViewClass(options);
            }
          } else {
            currentView.initialize(options);
          }
        }).on("pageshow", function onPageShow() {
        // The 'pageshow' event Handler, register back button event handler for
        // the current page view, and initialize the side menu for the page

        var self = that;
        var currentView = self.views[self.currentPage];
        if (currentView && currentView.el) {
          currentView.onBackButton();

          currentView.delegateViewEvents();

          // Trigger the 'active' event on side menu to highlight the current
          // page li
          currentView.sideMenu && currentView.sideMenu.trigger("active");
        }
      });

      // Load all the views class and navigate to the start page
      require(views, function() {
        var self = that;
        var paths = _.keys(Config.PAGES_VIEWS);
        var length = views.length;

        for ( var i = 0; i < length; i++) {
          self.viewClasses[paths[i]] = arguments[i];
        }

        Backbone.history.start();

        var startPage = self.currentPage = Config.START_PAGE;

        // Save context for the start page
        self.contextManager.save(startPage, {
          route : "module/index.html",
        });

        // Set the hash for the start page, and change page to it
        Backbone.Router.prototype.navigate.apply(self,
          [ "switch/" + startPage ]);

        $.mobile.changePage("pages/" + startPage);
      });
    },

    // Override the default navigate to save page context
    navigate : function(route, options) {
      var href = location.href;

      // Set the origin and route to options
      this.naviOpts = options = options || {};
      options.origin = href.slice(href.lastIndexOf("/") + 1);
      options.route = route;

      // Navigate the routes
      Backbone.Router.prototype.navigate.apply(this, [ route, {
        trigger : true,
      } ]);
    },

    // Triggered by the 'refresh' route
    refresh : function() {
      var currentPage = this.currentPage;
      this.naviOpts = this.contextManager.pop(currentPage);
      this.naviOpts.transition = "pop";

      // Replace the hash tailed with the current page, so other route action
      // can get the current page url from the hash
      Backbone.Router.prototype.navigate.apply(this, [
        "refresh/" + currentPage, {
          replace : true
        } ]);
      this.changePage(this.currentPage);
    },

    // Triggered by the change pages routes
    changePage : function(page) {
      var options = this.naviOpts || {};
      var errMsgs = options && options.errorMessage;
      var that = this;

      // Check connection, if available then navigate, else show alert so can
      // retry check the connection
      Helpers.connectionHandler(errMsgs && errMsgs.network, function success() {
        var self = that;
        var options = self.naviOpts;
        var currentView = self.views[page];

        // Save the options as context
        self.contextManager.save(page, options);

        // Remove the Dom cache, cause we open the JQM cache
        currentView && currentView.remove();

        // Use JQM api to change page
        self.currentPage = page;
        $.mobile.changePage(page, _.pick(options, "transition"));

      }, function onCancelRetry() {
        // If cancel retry then restore the original hash
        var self = that;
        var route = self.contextManager.get(self.naviOpts.origin).route;
        // Restore the hash
        Backbone.Router.prototype.navigate.apply(this, [ route ]);
      });
    },

    // Triggered by the 'back' route
    back : function(backPage) {
      var currentPage = this.currentPage;
      var contextManager = this.contextManager;
      var context = contextManager.get(currentPage);
      var naviOpts;

      // The target page can be set in hash or configuration file, if not set
      // then use the last page as target
      backPage = backPage || Config.BACK_PAGES[currentPage]
        || (context && context.origin);

      if (backPage) {
        // Not back to the current page
        if (backPage !== this.currentPage) {
          // If back botton don't mean exit
          if (backPage !== "exit") {
            this.currentPage = backPage;
            // Set the target page to hash, so the page can be get by other
            // action
            Backbone.Router.prototype.navigate.apply(this, [
              "back/" + backPage, {
                replace : true
              } ]);

            // Change page with reverse effect
            $.mobile.changePage(backPage, {
              reverse : true
            });
          } else {
            this.exit();
          }
        } else {
          // Back to the current page with the saved context and remove useless
          // context
          contextManager.pop();
          naviOpts = contextManager.pop();
          this.navigate(naviOpts.route, naviOpts);
        }
      }
    },

    // Triggered by the 'exit' route
    exit : function() {
      // WL.App.close();
      var self = this;

      Alerting.showConfirmationAlert("Do you want to exit the "
        + "application?", function() {
        if (navigator.app) {
          navigator.app.exitApp();
          return false;
        }
      }, function() {
        // If cancel retry then restore the original hash
        var route = self.contextManager.get(self.currentPage).route;
        // Restore the hash
        Backbone.Router.prototype.navigate.apply(this, [ route ]);
      });
    },
  });

  // Returns the Router
  return new Router();
});