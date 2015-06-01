define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerBaseInfoView = BaseView.extend({
    events : {
      'pageshow' : 'render',
    },

    next: function() {
      $.mobile.changePaeg();
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerBaseInfoView;
});