define([

"jquery", "backbone", "PageView", "TemplateUtils",
  "com/collections/MessageModelsCollection", "com/utils/Utils",
  "com/models/Constants", "Router", "SideMenuPanel",
// "com/utils/AuthenticationUtils"

], function($, Backbone, PageView, TemplateUtils, MessageModelsCollection,
  Utils, Constants, Router, SideMenuPanel) {

  var MessagesPageView = PageView.extend({

    // Show blank page during page change transition
    initialContent : "blank",

    // Event handlers for page view
    events : {
      "tap #home-button" : "home",
    },

    home : function() {
      Router.navigate("switch/home.html");
    },

    // Models, collections used by page would be assigned here
    modelAndCollections : [],

    initialize : function(options) {
      // Initialize the modelAndCollections with data in options set by the last
      // page view
      this.modelAndCollections = [ {
        // Can apply the collection through this.messsages
        name : "messages",
        objClass : MessageModelsCollection,
        // Parameters set in the hash of the restful url, which is used to fetch
        // the collection data
        params : {
          userId : (options && options.data && options.data.userId) || 1,
        }
      } ];

      PageView.prototype.initialize.apply(this, arguments);
      return this;
    },

    // Can override the base page view's load data
    // loadData : function() {
    loadDataTest : function() {
      // Load messages
      var self = this;
      // this.messages = new MessageModelsCollection(Constants.MESSAGES);
      this.messages = new MessageModelsCollection();
      this.messages.fetch({
        data : {
          userId : "1",
        },
        success : function() {
          self.render();
        }
      });
    },

    // Renders UI for page
    render : function() {
      var page = this;

      // Sub view of this page
      var MessageView = Backbone.View.extend({

        // Compiled template of the sub view
        template : TemplateUtils.template($("#message-template").html()),

        events : {
          "tap a" : "read",
        },

        initialize : function(options) {
          // If model is change then trigger the readed function
          this.listenTo(this.model, 'change', this.udpateClasses);
        },

        render : function() {
          var model = this.model.toJSON();
          model.date = moment(model.date).format("dddd, MMMM D, YYYY");
          
          // Use model to populate the template, and append it to the view
          this.$el.append(this.template(model));
          this.setElement(this.$("li"));
          return this;
        },

        udpateClasses : function() {
          // Update the classes for the read message
          this.$(".unreadBubble").remove();
          this.$(".urgentBubble").remove();
          this.$el.removeClass("unRead");
          
          // Update the bubble of the list divider
          page.updateNotificationBubble();
        },

        read : function() {
          this.model.read();
        }
      });
      
      // Hide list before update it
      var list = this.$("#messagesList").hide();

      // Update the span for unread messages
      this.updateNotificationBubble();

      // Append the messages to list view
      this.messages.each(function(message) {
        var view = new MessageView({
          model : message
        });
        list.append(view.render().el);
      });
      list.listview("refresh").show();

      // Insert a side menu
      this.sideMenu = new SideMenuPanel().render(this, "Messages");

      PageView.prototype.render.apply(this, arguments);
      return this;
    },

    // Update the notification bubble
    updateNotificationBubble : function() {
      Utils.updateNotificationBubble(this.$(".notificationBubbleSpan"),
        this.messages.where({
          "isRead" : false
        }).length);
    },

  });

  // Returns the View class
  return MessagesPageView;

});