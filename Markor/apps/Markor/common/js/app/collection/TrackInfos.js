'use strict';

define([
  "backbone",
  "model/TrackInfo",
  'app/Config',
], function(Backbone, TrackInfo, Config) {

  var TrackInfos = Backbone.Collection.extend({

    url : Config.API_URL + "/trackInfos",

    model : TrackInfo,

  });

  TrackInfos.datas = new TrackInfos([
    {
      "id" : 1,
      "level" : "A",
      "eventType" : "家访",
      "trackMethod" : "",
      "tractDate" : "2015-04-07",
      "comment" : [ {
        "createDate" : "2015-04-07",
        "content" : "客户需求不清楚",
        "userId" : 1
      } ],
      "nextTractTime" : "2015-04-12",
      "attachment" : [],
      "orderSum" : 1000,
      "orderSerial" : "1111-1111-1111",
      "plannedDate" : "2015-04-10",
      "detail" : "",
      "requirementId" : 1
    },
    {
      "id" : 2,
      "level" : "B",
      "eventType" : "初稿",
      "trackMethod" : "",
      "tractDate" : "2015-04-08",
      "comment" : [ {
        "createDate" : "2015-04-08",
        "content" : "客户需求明确",
        "userId" : 2
      } ],
      "nextTractTime" : "2015-04-15",
      "attachment" : [],
      "orderSum" : 1500,
      "orderSerial" : "1111-2222-1111",
      "plannedDate" : "2015-04-15",
      "detail" : "",
      "requirementId" : 2
    },
    {
      "id" : 3,
      "level" : "C",
      "eventType" : "定稿",
      "trackMethod" : "",
      "tractDate" : "2015-04-09",
      "comment" : [ {
        "createDate" : "2015-04-09",
        "content" : "客户需求不清楚",
        "userId" : 3
      } ],
      "nextTractTime" : "2015-04-17",
      "attachment" : [],
      "orderSum" : 2000,
      "orderSerial" : "1111-1111-2222",
      "plannedDate" : "2015-05-10",
      "detail" : "",
      "requirementId" : 3
    } ]);

  return TrackInfos;
});
