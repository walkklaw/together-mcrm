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

  Houses.datas = new Houses([ {
    'developer': '大华集团',
    'address': '春柳路291号',
    'building': '锦绣华城',
    'deliveryDate': '2016-05-06',
    'checkInDate': '2016-07-22',
    'type': 2,
    'decorationType': '',
    'decorationProgress': '',
    'state': '',
    'decorationCompany': '东易日盛',
    'designer': '王哲',
    'requirementId': 1
  } ]);

  return Houses;
});
