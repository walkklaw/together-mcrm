define([
  'backbone',
  'app/DataStore',
  'util/TemplateUtils',
  'collection/RequirementBriefs',
  'view/BaseView' ], function(Backbone, DataStore, TemplateUtils,
  RequirementBriefs, BaseView) {

  var CustomerRequirementView = BaseView.extend({
    events : {
      'pagebeforeshow' : 'render',
      'touchend #addRequirementBtn' : 'addRequirement',
      'touchend .requireList li' : 'editRequirement',
    },

    initialize : function(args) {
      this.requirementBriefs = args && args.props;
      this.requirementBriefs = RequirementBriefs.datas;
    },

    // steps:
    // create a requirement, deliveryIntention, house, perchaseIntention,
    // orderLosting, trackInfos
    // change page
    addRequirement : function() {
      $.mobile.changePage('customer_process.html');
    },

    // steps:
    // create and get requirement, deliveryIntention, house, perchaseIntention,
    // orderLosting, trackInfos
    // change page
    editRequirement : function() {
      $.ajax({

      });
    },

    render : function() {
      var template = TemplateUtils.template(this.$(
        '#requirement-brief-template').html());
      var datas = this.requirementBriefs.toJSON().map(function(data) {
        data.createDate = data.createDate.substring(0, 10);
        return data;
      });
      this.$('.requireList').append(template(datas)).enhanceWithin();
      return this;
    },
  });

  return CustomerRequirementView;
});