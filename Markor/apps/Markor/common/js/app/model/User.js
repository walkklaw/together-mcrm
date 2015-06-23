'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var User = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/users',

    idAttribute : '_id',

    defaults : {
      name : '',
      role : '',
      storeId : 0,
    },

  });

  return User;
});
