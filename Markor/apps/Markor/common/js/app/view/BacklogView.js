define([
  'backbone',
  'collection/ServiceEvents',
  'util/TemplateUtils',
  'promise' ], function(Backbone, ServiceEvents, TemplateUtils, P) {

  var categoryNames = {
    visit: '待家访',
    draft: '待初稿',
    finalDraft: '待定稿',
    placeOrder: '待下单',
    finish: '待完结',
    summary: '总计',
  };
  
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
      // console.log(ServiceEvents.datas.toJSON());
      var serviceEvents = this.serviceEvents, template = TemplateUtils
        .template(this.$('#serviceEvent-template').html());
      
      var list = serviceEvents.reduce(function(serviceEvent){
        var model = serviceEvent.toJSON();
        model.categoryName = categoryNames[model.category];
      }, '');
      console.log(template({
        category : 'test',
        categoryName : 'test',
        terriblelyExceeded : 1,
        exceeded : 2,
        health : 0,
      }));
      return this;
    },
  });

  return BacklogView;
});