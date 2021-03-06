'use strict';

define([
  "backbone",
  "model/Requirement",
  'app/Config',
], function(Backbone, Requirement, Config) {

  var Requirements = Backbone.Collection.extend({

    url : Config.API_URL + "/requirements",

    model : Requirement,

  });

  Requirements.datas = new Customers([
    {
      "id" : 1,
      "createDate" : "2015-06-05",
      "store" : 1,
      "primaryUser" : 1,
      "secondaryUsers" : [
        2,
        3 ],
      "earnest" : 0,
      "predictedSale" : 0,
      "orderSum" : 1000,
      "status" : "待定稿",
      "customerId" : 1,
      "creater" : 1
    },
    {
      "id" : 2,
      "createDate" : "2015-04-05",
      "store" : 2,
      "primaryUser" : 2,
      "secondaryUsers" : [
        3,
        1 ],
      "earnest" : 0,
      "predictedSale" : 0,
      "orderSum" : 2000,
      "status" : "待家访",
      "customerId" : 2,
      "creater" : 2
    },
    {
      "id" : 3,
      "createDate" : "2015-05-05",
      "store" : 3,
      "primaryUser" : 3,
      "secondaryUsers" : [
        1,
        2 ],
      "earnest" : 0,
      "predictedSale" : 0,
      "orderSum" : 1500,
      "status" : "待定稿",
      "customerId" : 3,
      "creater" : 3
    } ]);

  return Requirements;
});
