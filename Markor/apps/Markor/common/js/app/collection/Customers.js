'use strict';

define([
  "backbone",
  "model/Customer",
  'app/Config',
], function(Backbone, Customer, Config) {

  var Customers = Backbone.Collection.extend({

    url : Config.API_URL + "/customers",

    model : Customer,

  });

  Customers.datas = new Customers([
    {
      "id" : 1,
      "name" : "陈",
      "gender" : "male",
      "phones" : [
        "13811112222",
        "13811113333" ],
      "age" : 2,
      "birthday" : "1985-01-01",
      "family" : "李女士",
      "characteristic" : "国字脸戴眼镜",
      "comments" : [
        {
          "createTime" : "2015-05-01 21:35:03",
          "content" : "座驾：Jeep大切诺基",
          "userId" : 1
        },
        {
          "createTime" : "2015-05-02 20:35:03",
          "content" : "座驾：宝马",
          "userId" : 2
        } ]
    },
    {
      "id" : 2,
      "name" : "李",
      "gender" : "male",
      "phones" : [
        "13822221111",
        "13833331111" ],
      "age" : 2,
      "birthday" : "1987-01-01",
      "family" : "黄女士",
      "characteristic" : "国字脸",
      "comments" : [
        {
          "createTime" : "2015-05-15 10:35:03",
          "content" : "座驾：奔驰",
          "userId" : 2
        },
        {
          "createTime" : "2015-05-16 11:35:03",
          "content" : "座驾：大众",
          "userId" : 3
        } ]
    },
    {
      "id" : 3,
      "name" : "黄",
      "gender" : "female",
      "phones" : [
        "13811114444",
        "13844443333" ],
      "age" : 2,
      "birthday" : "1984-01-01",
      "family" : "李先生",
      "characteristic" : "瓜子脸",
      "comments" : [
        {
          "createTime" : "2015-04-01 12:35:03",
          "content" : "座驾：北京现代",
          "userId" : 3
        },
        {
          "createTime" : "2015-05-02 13:35:03",
          "content" : "座驾：宝马",
          "userId" : 1
        } ]
    } ]);

  return Customers;
});
