'use strict';

define([
  "backbone",
  "model/Store",
  'app/Config',
], function(Backbone, Store, Config) {

  var Stores = Backbone.Collection.extend({

    url : Config.API_URL + "/stores",

    model : Store,

  });

  Stores.datas = new Stores([
    {
      "id" : 1,
      "city" : "大连",
      "address" : "钻石路8号",
      "alliance" : "大华店"
    },
    {
      "id" : 2,
      "city" : "长沙",
      "address" : "水精路9号",
      "alliance" : "人大店"
    },
    {
      "id" : 3,
      "city" : "广州",
      "address" : "宝石路10号",
      "alliance" : "天花店"
    } ]);

  return Stores;
});
