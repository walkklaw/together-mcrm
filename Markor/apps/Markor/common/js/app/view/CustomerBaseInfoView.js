define([
  'backbone',
  'util/TemplateUtils',
  'collection/Customers',
  'view/BaseView' ], function(Backbone, TemplateUtils, Customers, BaseView) {

  var CustomerBaseInfoView = BaseView.extend({
    events : {
      'pageshow' : 'render',
      'touchend #save' : 'save',
    },

    render : function() {
      var template = TemplateUtils
        .template(this.$('#customer-template').html());
      this.$('tbody').prepend(template(Customers.datas.at(0).toJSON()))
        .enhanceWithin();

      return this;
    },

    save : function() {
      var test;
      this.$('[name="gender"][checked]').prop('id');
      this.$('.tel p').text();
      this.$('#birthday').val();
      test = this.$('#age').val();
      test = this.$('#family').val();
      test = this.$('#characteristic').val();
      test = this.$('#comments').val();
      console.log(test);
    },
  });

  return CustomerBaseInfoView;
});