define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerLostbillView = BaseView.extend({
    events : {
      'swipeleft .ui-content' : 'prev',
      'pageshow' : 'render',
    },

    prev: function() {
      $.mobile.changePage('customer_delivery.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerLostbillView;
});