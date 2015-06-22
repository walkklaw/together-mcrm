define([
  'backbone',
  'util/TemplateUtils',
  'collection/Customers',
  'collection/RequirementBriefs',
  'view/BaseView',
  'app/DataStore',
], function(Backbone, TemplateUtils, Customers, RequirementBriefs, BaseView,
  DataStore) {

  var CustomerBaseInfoView = BaseView.extend({
    events : {
      'pageshow' : 'render',
      'click #save' : 'save',
    },

    initialize : function(args) {
      this.customer = args && args.props;
      console.log(this.customer);
    },

    render : function() {
      var template = TemplateUtils
        .template(this.$('#customer-template').html());
      this.$('tbody').prepend(template(Customers.datas.at(0).toJSON()))
        .enhanceWithin();
      return this;
    },

    loadRequirement : function() {
      var requirementBriefs = new RequirementBriefs();
      this.loadColl(requirementBriefs, {
        customerId: 1,//this.customer.get('id'),
      }).then(function(){
        $.mobile.changePage('customer_requirement.html', {
          props: requirementBriefs,
        });
      });
    },

    save : function() {
      // save customer
      var test;
      this.$('[name="gender"][checked]').prop('id');
      this.$('.tel p').text();
      this.$('#birthday').val();
      test = this.$('#age').val();
      test = this.$('#family').val();
      test = this.$('#characteristic').val();
      test = this.$('#comments').val();
      console.log(test);

      this.loadRequirement();
    },
  });

  return CustomerBaseInfoView;
});