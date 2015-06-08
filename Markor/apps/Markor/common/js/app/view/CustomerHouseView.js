define([
  'backbone',
  'util/TemplateUtils',
  'collection/Houses',
  'view/BaseView' ], function(Backbone, TemplateUtils, Houses, BaseView) {

  var CustomerHouseView = BaseView.extend({
    events : {
      'pageshow' : 'render',
    },

    render : function() {
      var template = TemplateUtils
        .template(this.$('#house-template').html());
      this.$('tbody').prepend(template(Houses.datas.at(0).toJSON()))
        .enhanceWithin();

      return this;
    },
  });

  return CustomerHouseView;
});