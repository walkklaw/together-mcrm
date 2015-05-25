define([
  'backbone',
  'model/ServiceEvent',
  'collection/ServiceEvents',
  'util/TemplateUtils',
  'moment',
  'view/BaseView' ], function(Backbone, ServiceEvent, ServiceEvents,
  TemplateUtils, Moment, BaseView) {

  var BacklogView = BaseView.extend({
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
      var template = TemplateUtils.template(this.$('#serviceEvents-template')
        .html());
      var categoryNames = ServiceEvent.CATEGORY_NAMES;
      var templateParams = [];
      var summary = {
        sum : 0,
        category : 'summary',
        categoryName : categoryNames['summary'],
        terriblelyExceeded : 0,
        exceeded : 0,
        health : 0,
      };

      // Calculate the amount for each category and delay
      _.keys(_.omit(categoryNames, 'summary')).forEach(function(category) {
        var result = serviceEvents.getAmountOfDelayTypesForCategory(category);
        var templateParam = {
          category : category,
          categoryName : categoryNames[category],
          sum : result.health + result.exceeded + result.terriblelyExceeded,
        };
        _.extend(templateParam, result);
        
        templateParams.push(templateParam);

        // Calculate the amount for summary
        summary.sum += templateParam.sum;
        summary.health += templateParam.health;
        summary.exceeded += templateParam.exceeded;
        summary.terriblelyExceeded += templateParam.terriblelyExceeded;
      });

      templateParams.unshift(summary);

      var list = templateParams.reduce(function(htmlStr, templateParam) {
        return htmlStr + template(templateParam);
      }, '');
      this.$('#serviceEvents').append($(list)).listview('refresh');

      return this;
    },
  });

  return BacklogView;
});