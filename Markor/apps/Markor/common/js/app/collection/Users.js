'use strict';

define([
  "backbone",
  "model/User",
  'app/Config',
], function(Backbone, User, Config) {

  var Users = Backbone.Collection.extend({

    url : Config.API_URL + "/users",

    model : User,

  });

  Users.datas = new Users([
    {
      "id" : 1,
      "role" : "designer",
      "storeId" : 1
    },
    {
      "id" : 2,
      "role" : "designer",
      "storeId" : 2
    },
    {
      "id" : 3,
      "role" : "designer",
      "storeId" : 3
    },
    {
      "id" : 4,
      "role" : "director",
      "storeId" : 1
    } ]);

  return Users;
});
