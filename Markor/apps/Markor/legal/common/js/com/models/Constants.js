// Includes file dependencies
define([

"jquery", "backbone",

], function($, Backbone) {

  // The Model constructor
  var Constants = Backbone.Model.extend({}, {

    PASSCODE : "007",
    FOLDER_TEMPLATES : "../templates/",
    EXTENSION_TEMPLATES : ".handlebars",
    DEFAULT_PAGE_TRANSITION : "slide",
    DEFAULT_WINDOW_RESIZE_DELAY : 250, // default time to wait until
    // handling
    // the window resize event
    ALPHABETS : "abcdefghijklmnopqrstuvwxyz",
    DEFAULT_USER_LAT : 41.8782,
    DEFAULT_USER_LNG : -87.6297,
    CONTACTS_FILTER : "ibm",

    /**
     * ** page view classes need to be added here so they can be loaded before
     * being initialized ***
     */
    VIEW_CLASSES : [ "com/views/SplashPageView", "com/views/IndexPageView",
      "com/views/LoginPageView", "com/views/HomePageView",
      "com/views/MessagesPageView" ],

    /** ** default settings *** */
    SETTINGS_DEFAULT_LANGUAGE : "en",
    USER_DEFAULT_IMAGE : "../images/default_user.jpg",

    /** ** resolution constants *** */
    RESOLUTION_PHONE : 480,
    RESOLUTION_TABLET : 767,
    RESOLUTION_DESKTOP : 1200,

    /** ** events constants *** */
    EVENT_SETTINGS_UPDATE : "settingsupdate",

    /** ** localStorage constants *** */
    APP_LOCAL_STORAGE_PREFIX : "StarterBanking.",
    LS_KEY_LANGUAGE : "language",

  });

  // Returns the Model class
  return Constants;

});