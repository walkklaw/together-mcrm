define(['underscore', 'util/keyMirror', ], function( _, keyMirror ){
  var Constants = {
    FOLDER_TEMPLATES : "../templates/",
    EXTENSION_TEMPLATES : ".handlebars",
    DEFAULT_PAGE_TRANSITION : "slide",
    DEFAULT_WINDOW_RESIZE_DELAY : 250,
    DEFAULT_SHAKE_WATCH_FREQUENCY : 300,
    APP_NAME: "vehicle",
    INDUSTRIAL_API_URL: "http://12.139.41.106:4601",
  };
  
  return keyMirror({
    CHANGE_ROLES: null,
    START_GAME: null,
    END_GAME: null,
    ROUTE: null,
    KILL_PLAYER: null,
    CHANGE_LEXICON: null,
    CHANGE_LEXICON_SETTING: null,
  });
  
});

