'use strict';
define([ "backbone", "model/ServiceEvent", "app/Config",

], function(Backbone, ServiceEvent, Config) {

  var ServiceEvents = Backbone.Collection.extend({

    url : Config.API_URL + "/serviceEvents",

    model : ServiceEvent,

  });

  ServiceEvents.datas = new ServiceEvents([
    {
      "category" : "visit",
      "completeTime" : "",
      "CustomerId" : 1,
      "comment" : "visit",
      "createTime" : "2015-05-22",
      "suggestedDeadline" : 3,
      "exceededDeadline" : 7
    },
    {
      "category" : "draft",
      "completeTime" : "",
      "CustomerId" : 1,
      "comment" : "draft",
      "createTime" : "2015-05-22",
      "suggestedDeadline" : 3,
      "exceededDeadline" : 7
    },
    {
      "category" : "finalDraft",
      "completeTime" : "",
      "CustomerId" : 1,
      "comment" : "finalDraft",
      "createTime" : "2015-05-22",
      "suggestedDeadline" : 7,
      "exceededDeadline" : 14
    },
    {
      "category" : "placeOrder",
      "completeTime" : "",
      "CustomerId" : 1,
      "comment" : "placeOrder",
      "createTime" : "2015-05-22",
      "suggestedDeadline" : 7,
      "exceededDeadline" : 14
    },
    {
      "category" : "finish",
      "completeTime" : "",
      "CustomerId" : 1,
      "comment" : "finish",
      "createTime" : "2015-05-22",
      "suggestedDeadline" : 60,
      "exceededDeadline" : 90
    },
    {
      "category" : "finalDraft",
      "completeTime" : "",
      "CustomerId" : 1,
      "comment" : "finalDraft",
      "createTime" : "2015-05-22",
      "suggestedDeadline" : 7,
      "exceededDeadline" : 14
    } ]);

  return ServiceEvents;
});
