define([
  'backbone',
  'model/ServiceEvent',
  'collection/ServiceEvents',
  'util/TemplateUtils',
  'moment',
  'promise' ], function(Backbone, ServiceEvent, ServiceEvents, TemplateUtils,
  Moment, P) {

  var BacklogView = Backbone.View.extend({
    events : {
      'tap #shareCar, #passenger' : 'noFeature',
      'pagebeforeshow' : 'initViewState',
    },

    noFeature : function() {
      return this;
    },

    loadColl : function(collection) {
      return new Promise(function(resolve, reject) {
        collection.fetch({
          success : function() {
            resolve();
          },
          error : function() {
            reject();
          }
        });
      });
    },

    initViewState : function() {
      var serviceEvents = new ServiceEvents(), self = this;
      this.loadColl(serviceEvents).then(function() {
        self.state = serviceEvents;
        self.render();
      });
    },

    render : function() {
      var serviceEvents = this.state;
      var template = TemplateUtils.template(this.$('#serviceEvent-template')
        .html());
      var categoryNames = ServiceEvent.CATEGORY_NAMES;
      var templateParams = [];

      _.keys(_.omit(categoryNames, 'summary'))
        .forEach(
          function(category) {
            var templateParam = {
              category : category,
              categoryName : categoryNames[category],
              terriblelyExceeded : 0,
              exceeded : 0,
              health : 0,
            };
            var categorySEs = serviceEvents.where({
              category : category
            });
            categorySEs
              .forEach(function(serviceEvent) {
                // Need some input test
                serviceEvent = serviceEvent.toJSON();
                var now, createTime = serviceEvent.createTime,
                  completeTime = Moment(serviceEvent.completeTime);
                if (!(completeTime && completeTime.isValid())
                  && Moment(createTime).isValid()) {
                  now = Moment().startOf('day');
                  if (Moment(createTime).add(serviceEvent.suggestedDeadline,
                    'd') > now) {
                    templateParam.health++;
                  } else if (Moment(createTime).add(
                    serviceEvent.exceededDeadline, 'd') > now) {
                    templateParam.exceeded++;
                  } else {
                    templateParam.terriblelyExceeded++;
                  }
                }
              });
            templateParams.push(templateParam);
          });
      var list = templateParams.reduce(function(htmlStr, templateParam) {
        return htmlStr + template(templateParam);
      }, '');
      this.$('#serviceEvents').append($(list));
      this.$el.trigger('pagecreate');
      console.log(list);
      return this;
    },
  });

  return BacklogView;
});