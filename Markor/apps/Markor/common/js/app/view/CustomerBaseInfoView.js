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
      'pagebeforeshow' : 'render',
      'touchend #save' : 'save',
      'touchend #addPhoneBtn' : 'addPhone',
    },

    initialize : function(args) {
      this.customer = args && args.props;
      this.customer = Customers.datas.at(0);
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
        customerId : this.customer.get('id'),
      }).then(function() {
        $.mobile.changePage('customer_requirement.html', {
          props : requirementBriefs,
        });
      });
    },

    getPhones : function() {
      var i, len, phones = [], $p = this.$('.tel p');
      for (i = 0, len = $p.length; i < len; i++) {
        phones.push($($p[0]).text());
      }
      return phones;
    },

    getComments : function() {
      this.$('#comments').val();
    },

    save : function() {
      // * save customer, but not save comments here
      this.customer.save({
        name : this.$('#name').val(),
        gender : this.$('[name="gender"][checked]').prop('id'),
        phones : this.getPhones(),
        birthday : this.$('#birthday').val(),
        age : parseInt(this.$('#age').val()),
        family : this.$('#family').val(),
        characteristic : this.$('#characteristic').val(),
      }, {
        success : (function() {
          this.loadRequirement();
        }).bind(this),
      });
    },

    // * filter the invalid inputs
    addPhone : function() {
      var $addBtn = this.$('#addPhone'), newPhone = $addBtn.val(), $p, $ps;
      if (!/^\s*$/.test(newPhone)) {
        $p = $('<p>').html($addBtn.val());
        $ps = this.$('.tel p');
        $($ps[$ps.length - 1]).after($p);

        $addBtn.val('');
      }
    },
  });

  return CustomerBaseInfoView;
});