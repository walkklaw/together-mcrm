'use strict';

define([
  "backbone",
  "model/PerchaseIntention",
  'app/Config',
], function(Backbone, PerchaseIntention, Config) {

  var PerchaseIntentions = Backbone.Collection.extend({

    url : Config.API_URL + "/perchaseIntentions",

    model : PerchaseIntention,

  });

  PerchaseIntentions.datas = new PerchaseIntentions([
    {
      "id" : 1,
      "roomPlanning" : "客厅",
      "style" : "经典",
      "category" : "实木",
      "series" : "复兴印记",
      "requirementId" : 1
    },
    {
      "id" : 2,
      "roomPlanning" : "餐厅",
      "style" : "传统",
      "category" : "沙发",
      "series" : "变迁迷情",
      "requirementId" : 2
    },
    {
      "id" : 3,
      "roomPlanning" : "书房",
      "style" : "乡村",
      "category" : "床垫",
      "series" : "帝国荣耀",
      "requirementId" : 3
    } ]);

  return PerchaseIntentions;
});
