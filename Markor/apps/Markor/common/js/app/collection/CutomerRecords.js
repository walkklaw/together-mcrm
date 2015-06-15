'use strict';

define([
  "backbone",
  "model/CutomerRecord",
  'app/Config',
], function(Backbone, CutomerRecord, Config) {

  var CutomerRecords = Backbone.Collection.extend({

    url : Config.API_URL + "/cutomerRecords",

    model : CutomerRecord,

  });

  CutomerRecords.datas = new CutomerRecords([
    {
      "id" : 1,
      "userId" : 1,
      "start" : "2015-05-07 09:30:26",
      "end" : "2015-05-07 10:30:26",
      "isEffective" : true
    },
    {
      "id" : 2,
      "userId" : 2,
      "start" : "2015-05-07 09:30:26",
      "end" : "2015-05-07 10:30:26",
      "isEffective" : true
    },
    {
      "id" : 3,
      "userId" : 3,
      "start" : "2015-05-07 09:30:26",
      "end" : "2015-05-07 10:30:26",
      "isEffective" : true
    },
    {
      "id" : 4,
      "userId" : 1,
      "start" : "2015-05-07 09:30:26",
      "end" : "2015-05-07 10:30:26",
      "isEffective" : false
    },
    {
      "id" : 5,
      "userId" : 2,
      "start" : "2015-05-07 09:30:26",
      "end" : "2015-05-07 10:30:26",
      "isEffective" : false
    },
    {
      "id" : 6,
      "userId" : 3,
      "start" : "2015-05-07 09:30:26",
      "end" : "2015-05-07 10:30:26",
      "isEffective" : false
    } ]);

  return CutomerRecords;
});
