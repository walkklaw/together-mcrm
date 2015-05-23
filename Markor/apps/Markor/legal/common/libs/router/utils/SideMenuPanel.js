define([ "jquery", "backbone", "Config", "LocalizationUtils", "TemplateUtils",
  "MenuLinkModelsCollection", "Router", "Alerting", ],

function($, Backbone, Config, LocalizationUtils, TemplateUtils,
  MenuLinkModelsCollection, Router, Alerting) {

  // Extends PagView class
  var SideMenuPanel = Backbone.View.extend({

    tagName : "div",

    menuLinks : new MenuLinkModelsCollection(Config.MENU_LINKS),

    render : function(page, currentLinkId) {
      var self = this;
      var pageEl = page.$el;
      var menu = this.$el;

      // Li view in the side menu panel
      var MenuLinkView = Backbone.View.extend({
        tagName : "li",

        events : {
          "tap" : "tap",
          "taphold" : "tap",
        },

        render : function() {
          var $li = this;
          var linkId = this.model.get("linkId");
          // De-active event name for this li view
          var eventName = "deactive" + linkId.match(/(\w)+\s*/)[0];
          var params = $.extend({
            isLink : true
          }, this.model.toJSON());

          // Populate the side menu li template in the side menu panel
          TemplateUtils.getTemplate("side_menu", params, function(html) {
            // Before insert li, need to localization the html, and add special
            // class for logout li
            $li.$el.append(LocalizationUtils.applyLocalization(html)).addClass(
              linkId == "Log Out" ? "sbLogout" : "");
          }, false, false);

          // Listen to the active and de-active event
          this.listenTo(self, eventName, this.deactive);
          this.listenTo(self, "active", this.active);

          return this;
        },

        // Handle the tap and taphold event on the li of side menu
        tap : function(event) {
          var linkId = this.model.get("linkId");
          var link = this.model.get("link");

          // If tap on a li which is not the current active li, then logout or
          // change page, else simply close the side menu panel
          if (linkId !== currentLinkId) {
            if (linkId === "Log Out") {
              Alerting.showConfirmationAlert("Are you sure you want to log out?", function(){
                Router.navigate("switch/login.html", {
                  transition : "none",
                });
              });
              menu.panel("close");
            } else {
              // De-activate the current active li, and activate the target li
              // by add class
              self.trigger("deactive" + currentLinkId);
              this.$("a").addClass("ui-btn-active");

              Router.navigate("switch/" + link, {
                transition : "slide",
              });
            }
          } else {
            menu.panel("close");
          }

          // Prevent the tap event triggered on elements under the side menu
          // panel
          event.preventDefault();
        },

        // De-activate the active li
        deactive : function() {
          this.$("a").removeClass("ui-btn-active");
        },

        // activate the li
        active : function() {
          this.deactive();
          if(this.model.get("linkId") === currentLinkId){
            this.$("a").addClass("ui-btn-active");
          }
        },
      });

      // Populate the side menu button template in the header
      TemplateUtils.getTemplate("side_menu_button", {}, function(html) {
        var menuButton;
        var header = $(page.$("[data-role=header]")[0]);
        var rightButton = header.find("a");

        // Force the exited button placed on the right side
        rightButton && rightButton.removeClass("ui-btn-left");

        // Insert the menu button in the header and change it's hash to the id
        // of menu panel
        menuButton = header.prepend(html).find("a")[0];
        $(menuButton).attr("href", "#" + currentLinkId + "menu");

        // Refresh the header to enhance it with JQM effect
        header.toolbar("refresh");
      }, false, false);

      // Populate the side menu panel template in the page
      TemplateUtils.getTemplate("side_menu_content", {}, function(html) {
        var menuPanel;

        // Insert the menu panel in page and change it's id according the link
        // id
        menuPanel = pageEl.append(html).find("#menu")[0];
        $(menuPanel).attr("id", currentLinkId + "menu");
      }, false, false);

      menu = page.$(".menu");
      
      // Populate the side menu list template in the side menu panel
      TemplateUtils.getTemplate("side_menu", {
        isLink : false
      }, function(html) {
        self.$el.append(html);
        
        // Unwrap the outer div
        self.setElement(self.$("#menuList"));
        self.$el.unwrap();
        
        // Append each menu li to the list
        self.menuLinks.each(function(link) {
          var temp = new MenuLinkView({
            model : link
          }).render().el;
          self.$el.append(temp);
        });

        // Hide the menu then insert the list to the panel, then trigger the
        // 'create' event to enhance the side menu
        menu.hide().append(self.el);
        pageEl.trigger("create");

        // Show side menu and active the current li
        menu.show();
        self.trigger("active");
      });

      // Register the swipe event handler
      pageEl.off("swipeleft").on("swipeleft", function() {
        menu.panel("close");
      }).off("swiperight").on("swiperight", function() {
        menu.panel("open");
      });

      return this;
    },

  });

  // Returns the View class
  return SideMenuPanel;

});