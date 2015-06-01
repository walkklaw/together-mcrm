define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerRequirementView = BaseView.extend({
    events : {
//      'swipeleft .ui-content' : 'prev',
//      'swiperight .ui-content' : 'next',
      'pageshow' : 'render',
    },

    next: function() {
      $.mobile.changePage('customer_process.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerRequirementView;
});