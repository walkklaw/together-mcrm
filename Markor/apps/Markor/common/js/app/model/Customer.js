'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var Customer = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/customers',

    idAttribute : '_id',

    defaults : {
      name : '',
      gender : '',
      phones : [],
      age : 0,
      birthday : '',
      family : '',
      characteristic : '',
      comment : [],
    },

  });

  return Customer;
});
