'use strict';

define([
  "backbone",
  "model/RequirementBrief",
  'app/Config',
], function(Backbone, RequirementBrief, Config) {

  var RequirementBriefs = Backbone.Collection.extend({

    url : Config.API_URL + "/requirementBriefs",

    model : RequirementBrief,

  });

  RequirementBriefs.datas = new RequirementBriefs([
    {
      "createDate" : "2015-06-05T00:00:00.000Z",
      "store" : "大华店",
      "level" : "A",
      "primaryUser" : "赵毅",
      "status" : "家访"
    },
    {
      "createDate" : "2015-06-05T00:00:00.000Z",
      "store" : "人大店",
      "level" : "B",
      "primaryUser" : "钱尔",
      "status" : "初稿"
    },
    {
      "createDate" : "2015-06-05T00:00:00.000Z",
      "store" : "天花店",
      "level" : "C",
      "primaryUser" : "孙衫",
      "status" : "定稿"
    },
  ]);

  return RequirementBriefs;
});
