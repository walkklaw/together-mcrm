define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerDeliveryView = BaseView.extend({
    events : {
      'swipeleft .ui-content' : 'prev',
      'swiperight .ui-content' : 'next',
      'pageshow' : 'render',
    },

    prev: function() {
      $.mobile.changePage('customer_intention.html');
    },
    
    next: function() {
      $.mobile.changePage('customer_lostbill.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerDeliveryView;
});