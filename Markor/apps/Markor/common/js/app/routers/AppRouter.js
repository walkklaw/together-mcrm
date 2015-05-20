'use strict';

define([ 'backbone', 'app/Config', ], function(Backbone, Config) {

  var viewClasses = {}, viewPath = 'view/', configViewClass = Config.VIEW_CLASSES;

  $(document).on(
    'pagebeforecreate',
    function(event, data) {
      var pageClassName, PageClass, page = event.target;
      if (page) {
        pageClassName = $(page).attr('data-class');

        // process params from url and pass to new page
        if (pageClassName) {
          PageClass = viewClasses[viewPath + pageClassName];
          new PageClass({
            el : page,
          });
        }
      }

  }).on('pageshow', function() {
    // trigger to fix JQM page height
    $(window).trigger('resize');
  });

  // Load all view classes
  require(configViewClass, function() {
    for (var i = 0, len = configViewClass.length; i < len; i++) {
      viewClasses[configViewClass[i]] = arguments[i];
    }

    // go to index page and init components
    $.mobile.changePage('pages/dataStatistics.html', {
      transition : 'none',
    });
  });

});