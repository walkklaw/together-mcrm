'use strict';

define([
  "backbone",
  "model/OrderLosting",
  'app/Config',
], function(Backbone, OrderLosting, Config) {

  var OrderLostings = Backbone.Collection.extend({

    url : Config.API_URL + "/orderLostings",

    model : OrderLosting,

  });

  OrderLostings.datas = new OrderLostings([
    {
      "id" : 1,
      "lostingDate" : "2015-07-01",
      "reason" : "顾客购买竞品",
      "competitorPurchaseReason" : "交期",
      "requirementId" : 4
    },
    {
      "id" : 2,
      "lostingDate" : "2015-07-02",
      "reason" : "放弃购买家具",
      "competitorPurchaseReason" : "",
      "requirementId" : 5
    },
    {
      "id" : 3,
      "lostingDate" : "2015-07-03",
      "reason" : "原因不明",
      "competitorPurchaseReason" : "",
      "requirementId" : 6
    } ]);

  return OrderLostings;
});
