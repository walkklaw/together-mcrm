'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var User = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/users',

    defaults : {
      role : '',
      storeId : 0,
    },
    
  });

  return User;
});
