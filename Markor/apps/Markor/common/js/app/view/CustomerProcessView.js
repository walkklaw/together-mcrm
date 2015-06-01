define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerProcessView = BaseView.extend({
    events : {
      'swiperight .ui-content' : 'next',
      'pageshow' : 'render',
    },

    next: function() {
      $.mobile.changePage('customer_track.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerProcessView;
});