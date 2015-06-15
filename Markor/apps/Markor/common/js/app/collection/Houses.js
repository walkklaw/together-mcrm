'use strict';

define([
  "backbone",
  "model/House",
  'app/Config',
], function(Backbone, House, Config) {

  var Houses = Backbone.Collection.extend({

    url : Config.API_URL + "/houses",

    model : House,

  });

  Houses.datas = new Houses([
    {
      "id" : 1,
      "developer" : "大华集团",
      "address" : "春柳路291号",
      "building" : "锦绣华城",
      "deliveryDate" : "2016-05-06",
      "checkInDate" : "2016-07-22",
      "type" : "公寓",
      "decorationCompany" : "东易日盛",
      "designer" : "王哲",
      "requirementId" : 1
    },
    {
      "id" : 2,
      "developer" : "华谊集团",
      "address" : "大树路291号",
      "building" : "北华城",
      "deliveryDate" : "2017-05-06",
      "checkInDate" : "2017-07-22",
      "type" : "别墅",
      "decorationCompany" : "东易日盛",
      "designer" : "李哲",
      "requirementId" : 2
    },
    {
      "id" : 3,
      "developer" : "碧桂园集团",
      "address" : "春华291号",
      "building" : "梨花城",
      "deliveryDate" : "2016-04-06",
      "checkInDate" : "2016-05-22",
      "type" : "现房",
      "decorationCompany" : "东易日盛",
      "designer" : "黄哲",
      "requirementId" : 3
    } ]);

  return Houses;
});
