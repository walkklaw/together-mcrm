define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerIntentionView = BaseView.extend({
    events : {
      'swipeleft .ui-content' : 'prev',
      'swiperight .ui-content' : 'next',
      'pageshow' : 'render',
    },

    prev: function() {
      $.mobile.changePage('customer_house.html');
    },
    
    next: function() {
      $.mobile.changePage('customer_delivery.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerIntentionView;
});