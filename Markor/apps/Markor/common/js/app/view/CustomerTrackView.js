define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerTrackView = BaseView.extend({
    events : {
      'swipeleft .ui-content' : 'prev',
      'swiperight .ui-content' : 'next',
      'pageshow' : 'render',
    },

    prev: function() {
      $.mobile.changePage('customer_process.html');
    },
    
    next: function() {
      $.mobile.changePage('customer_house.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerTrackView;
});