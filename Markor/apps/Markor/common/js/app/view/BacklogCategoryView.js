define([
  'backbone',
  'model/ServiceEvent',
  'collection/ServiceEvents',
  'util/TemplateUtils',
  'moment',
  'view/BaseView' ], function(Backbone, ServiceEvent, ServiceEvents,
  TemplateUtils, Moment, BaseView) {

  var BacklogCategoryView = BaseView.extend({
    events : {
      'tap .categoryTitle' : 'showCategory',
      'pagebeforeshow' : 'initViewState',
    },

    showCategory : function(event) {
      BaseView.parameters = $(event.target).attr('data-category');
      $.mobile.changePage('backlogCategory.html');
    },

    // Load data then render
    initViewState : function() {
      var serviceEvents = new ServiceEvents(), self = this;
      this.loadColl(serviceEvents).then(function() {
        self.state = serviceEvents;
        self.render();
      });
    },

    render : function() {
      var serviceEvents = this.state;
      var category = BaseView.parameters;
      var categoryEvents = serviceEvents.where({
        category : category
      });

      var templateParams = _.sortBy(categoryEvents.map(function(serviceEvent) {
        var result = serviceEvent.getDelayAndType();
        return {
          name : '陈女士',
          buildingName : '远洋万和公馆',
          delayType : result.delayType,
          delay : result.delay,
        };
      }), function(templateParam) {
        return templateParam.delay;
      });

      var template = TemplateUtils.template(this.$('#serviceEvents-template')
        .html());
      var list = template({
        category : category,
        categoryName : ServiceEvent.CATEGORY_NAMES[category],
        sum : categoryEvents.length,
      });

      template = TemplateUtils
        .template(this.$('#serviceEvent-template').html());
      list += templateParams.reduce(function(htmlStr, templateParam) {
        return htmlStr + template(templateParam);
      }, '');
      this.$('#serviceEvents').append($(list)).listview('refresh');

      return this;
    },
  });

  return BacklogCategoryView;
});