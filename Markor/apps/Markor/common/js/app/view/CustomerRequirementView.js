define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerRequirementView = BaseView.extend({
    events : {
      'pageshow' : 'render',
    },

    initialize : function(args) {
      this.requirementBriefs = args && args.props;
      console.log(this.requirementBriefs);
    },
    
    test: function() {
      $.mobile.changePage('customer_process.html');
    },
    
    render : function() {
      return this;
    },
  });

  return CustomerRequirementView;
});