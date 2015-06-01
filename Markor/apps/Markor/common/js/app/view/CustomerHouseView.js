define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerHouseView = BaseView.extend({
    events : {
      'swipeleft .ui-content' : 'prev',
      'swiperight .ui-content' : 'next',
      'pageshow' : 'render',
    },

    prev: function() {
      $.mobile.changePage('customer_track.html');
    },
    
    next: function() {
      $.mobile.changePage('customer_intention.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerHouseView;
});