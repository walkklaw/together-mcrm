define([

"jquery", "backbone", "Config", "Loading", "DataLoader", "LocalizationUtils",
  "Router" ], function($, Backbone, Config, Loading, DataLoader,
  LocalizationUtils, Router) {

  // Extends Backbone.View
  var PageView = Backbone.View.extend({

    loadingCount : 0,

    _resizeEvent : "", // string
    _settingsUpdateEvent : "", // string
    
    // Models, collections used by page would be assigned here
    modelAndCollections : [],

    basePageEvents : {
      "pagebeforehide" : "dispose",
    },

    // Delegate the base events and sub view events
    delegateViewEvents : function() {
      var self = this;
      var resizeTimerId = null;
      
      this.delegateEvents(_.extend({}, this.basePageEvents, this.events));
      
      this._resizeEvent = "resize." + this.cid;
      this._settingsUpdateEvent = "setting." + this.cid;
      
      // handle when window is resized/orientation change
      $(window).on(this._resizeEvent, function() {

        clearTimeout(resizeTimerId);
        resizeTimerId = setTimeout(function() {
          self._onResize();
        }, Config.DEFAULT_WINDOW_RESIZE_DELAY);

      }).on(this._settingsUpdateEvent, function() {

        self._onSettingsUpdate();

      });
    },

    initialize : function(options) {
      var element = options.element;
      if(!element){
        console.error("Please set the element attribute in the sub page view, " +
            "its value is the page view id.");
        return;
      }
      // Apply the view to specific element assign by sub view
      this.setElement("#" + element);

      // Apply localization for the html
      this.$el.html(LocalizationUtils.applyLocalization(this.$el.html()));

      // Show the initial content and hide other elements
      return this.showInitContent();
    },

    // Register physical back button handler 
    onBackButton : function() {
      $(document).off("backbutton").on("backbutton", function() {
        Router.navigate("back");
      });
    },

    initialContent : "header",

    // Show the initial content according to 'initialContent' attribute and hide
    // other elements
    showInitContent : function() {
      // Show the loading icon and cover a page with a div
      Loading.show("Loading...");

      switch (this.initialContent) {
      case "header":
        this.hiddenElArray = this.$("[data-role=content], [data-role=footer]");
        break;
      case "blank":
        this.hiddenElArray = this
          .$("[data-role=header], [data-role=content], [data-role=footer]");
        break;
      case "all":
      default:
        break;
      }
      this.hiddenElArray && this.hiddenElArray.hide();

      return this.preLoadData();
    },

    // Do something before load data, can be override by sub view
    preLoadData : function() {
      var self = this;
      this.$el.on("pageshow", function() {
        self.loadData();
        self.$el.off("pageshow");
      });
      return this;
    },

    // Load data for the page view, can be override by sub view
    loadData : function() {
      var self = this;
      function afterLoadData() {
        self.postLoadData();
      }

      // Use data loader to load data
      DataLoader.loadPageData(this, this.modelAndCollections, afterLoadData);
      return this;
    },

    // Do something after load data, can be override by sub view
    postLoadData : function() {
      return this.render();
    },

    render : function() {
      // this.$el.html(LocalizationUtils.applyLocalization(this.$el.html()))
      // .trigger("create");
       this.delegateViewEvents();

      // Register page view events and Show the hidden elements
//      this.delegateEvents();
      this.showPage();

      return this;
    },

    // Show the hidden elements and hide the loading icon
    showPage : function() {
      // after data loaded, show entire page
      this.$el.children().show();
      this.hiddenElArray && this.hiddenElArray.show();

      // Resize the page for no header and footer page
      if (this.$("div[data-role=header], div[data-role=footer]").size() === 0) {
        this.$el.css("min-height", "100%");
      }

      // Hide the loading icon and hide the transparent div
      Loading.hide("Loading...");

      // this.delegateViewEvents();
      return this;
    },

    _onResize : function() {
      $(window).trigger("scroll");
    },
    
    // Do any cleanup, remove window binding here
    dispose : function() {
      $(window).off(this._resizeEvent).off(this._settingsUpdateEvent);
      this.undelegateEvents();
    },

  });

  // Returns the View class
  return PageView;

});