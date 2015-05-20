'use strict';

var rootPath = '..', appPath = rootPath + '/app';

requirejs.config({
  baseUrl : 'js/lib',

  paths : {
    app : appPath,
    model : appPath + '/model',
    collection : appPath + '/collection',
    view : appPath + '/view',
    util : appPath + '/util',
    root : rootPath,
    constant : appPath + '/constant',
    localstorage : 'backbone.localStorage',
    jquerymobile : 'jquery.mobile',
  },

  shim : {
    backbone : {
      deps : [ 'underscore', 'jquery' ], exports : 'Backbone'
    }, underscore : {
      exports : '_'
    }, react : {
      exports : 'React'
    }, localstorage : {
      deps : [ 'backbone' ]
    }, slick : {
      deps : [ 'jquery' ]
    },
  },
});

function wlCommonInit() {

  requirejs([ 'jquery', ], function($) {
    $(document).on('mobileinit', function() {
      // Prevents all anchor click handling including the addition of active
      // button state and alternate link bluring.
      // $.mobile.linkBindingEnabled = false;

      // Disabling this will prevent jQuery Mobile from handling hash
      // changes
      // $.mobile.hashListeningEnabled = false;

      console.log("mobile init!");

      // disable selection for any element on the page
      // document.onselectstart = function() {
      // return false;
      // };

      // make sure scroll event fires sooner on ios
      // document.addEventListener("touchmove", function() {
      // $(window).trigger("scroll");
      // }, false);
      // document.addEventListener("scroll", function() {
      // $(window).trigger("scroll");
      // }, false);

      // set default page transition
      // $.mobile.defaultPageTransition = Constants.DEFAULT_PAGE_TRANSITION;

      // $.mobile.page.prototype.options.domCache = true;

      // Instantiates a new Backbone.js Mobile Router
      // MobileRouter = new MobileRouter();
      requirejs([ 'app/routers/AppRouter' ]);
    });

    requirejs([ 'jquerymobile', 'less', ], function($mobile, Less) {

    });
  });
}

requirejs([ 'root/initOptions' ], function() {
  window.WL ? WL.Client.init(wlInitOptions) : wlCommonInit();
});
