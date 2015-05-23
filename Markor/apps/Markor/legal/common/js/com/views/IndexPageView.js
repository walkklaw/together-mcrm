define([

"jquery", "backbone", "PageView", "Router",

], function($, Backbone, PageView, Router) {

  // Extends PagView class
  var IndexPageView = PageView.extend({

    
    /**
     * Establish a connection to the Worklight Server. This servers 2 purposes:
     * 1. The device running this app register itself on the server so that it can be monitored and managed on the Worklight Console
     * 2. Check if the device is allowed to run the app. For example, if the device is disabled by the admin via the Worklight Console, 
     * 	  the attempt to connect will fail
     */
     connectServer : function() {
    	
      //Establish a connection to the Server in order to: (1) register the device, and (2) check if the device is allowed to run the app.
      //An alert messages will prompt when the device is disabled by the admin
      window.WL && WL.Client.connect({
    	 onSuccess : function() {
             console.log("connect to worklight server successfully.");
         }, 
         onFailure : function() {
        	 console.log("connect to worklight server failed.");
         }        
      });

      // Set a friendly name of the device so that on the Worklight Console
      // it can be found with this name
      window.WL && WL.Device.setFriendlyName("ibm de", {
        onSuccess : function() {
          console.log("set friendly name successfully.");
        },
        onFailure : function() {
          console.log("set friendly name failed.");
        }
      });
    },

    // Override the base view's to register back button event handler
    onBackButton: function(){
      // kill the app on back button
      $(document).off("backbutton").on("backbutton", function() {
        Router.navigate("exit");
      });
    },
    
    // override base view's, need to invoke the parent view's initialize
    initialize : function() {
      PageView.prototype.initialize.apply(this, arguments);
      
      //Connect to the Worklight server
      this.connectServer();
      
      return this;
    },

    // override base view's, need to invoke the parent view's render
    render : function() {
      PageView.prototype.render.call(this);

      Router.navigate("switch/about.html");
      return this;
    },

  });

  // Returns the View class
  return IndexPageView;

});