// Includes file dependencies
define(["jquery"], {
  // *********** constants for libs ************//
  // ***** For RequireJSConfig.js
  IS_WIREFRAME: false,
  
  // ***** For TemplateUtils.js
  FOLDER_TEMPLATES : "../templates/",
  EXTENSION_TEMPLATES : ".handlebars",

  // ***** For Alerting.js
  DEFAULT_TITLE : "ModularityPoC",
  DEFAULT_ALERT_LABEL : "OK",
  DEFAULT_COMFIRM_LABEL : "Cancel,OK",
  DEFAULT_RETRY_LABEL : "Cancel,Retry",
  
  // ***** For ApiUtils.js
  DEFAULT_TIMEOUT : 30,

  DEFAULT_WINDOW_RESIZE_DELAY : 25,
  
  // ***** For LocalizationUtils.js
  // Path of JSON file
  LOCALIZATION_JSON : "data/localizations/mapping.json",
  // Default Language
  SETTINGS_DEFAULT_LANGUAGE : "en",

  // ***** For Router.js
  // The first page
  START_PAGE : "index.html",

  // Routes
  PAGES_ROUTES : {
    // change page routes, can category by different module
    // "module/:page" : "changePage",
    "commonModule/:page" : "changePage",
    "messageModule/:page" : "changePage",
    
    // Simply change page
    "switch/:page" : "changePage",
    
    // Refresh current page route
    "refresh" : "refresh",
    
    // Back to a fixed page or last page route
    "back(/:page)" : "back",
    
    // Exit the app route
    "exit" : "exit",
  },

  // Pages and the related views
  PAGES_VIEWS : {
    "index.html" : "com/views/IndexPageView",
    "about.html" : "com/views/AboutPageView",
    "login.html" : "com/views/LoginPageView",
    "home.html" : "com/views/HomePageView",
    "message_center.html" : "com/views/MessagesPageView",
    "contact.html" : "com/views/ContactPageView",
  },

  // Back pages
  BACK_PAGES : {
    "home.html" : "login.html",
    "login.html" : "about.html",
    "about.html" : "exit",
  },
  
  // Default error messages
  DEFAULT_ERROR_MESSAGES : {
    "default" : "System error occurred. Please try again later.",
    network : "No network connection at this time. Please try again later.",
    timeout : "Connection timeout. Please try again later.",
    server : "The server cannot be reached at this time. Please try again later.",
  },

  // ***** For SideMenuPanel.js
  // Config the side menu list
  MENU_LINKS : [ {
    "linkId" : "Home",
    "name" : "%menu.label.home%",
    "link" : "home.html"
  }, {
    "linkId" : "Messages",
    "name" : "%menu.label.message%",
    "link" : "message_center.html"
  }, {
    "linkId" : "Log Out",
    "name" : "%menu.label.logout%",
    "link" : "#",
  } ],
  
  init: function(){
    $(document).on("mobileinit", function(){
      //button state and alternate link bluring.
      $.mobile.linkBindingEnabled = !!this.IS_WIREFRAME;
      
      // Disabling this will prevent jQuery Mobile from handling hash changes
      $.mobile.hashListeningEnabled = !!this.IS_WIREFRAME;
    });
    return this;
  }
}.init());
