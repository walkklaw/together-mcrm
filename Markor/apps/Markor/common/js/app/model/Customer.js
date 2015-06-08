'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var Customer = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/customers',

    defaults : {
      name: '',
      gender: '',
      phones: [],
      age: 1,
      birthday: '',
      family: '',
      characteristic: '',
      comment: [],
      userId: 0,
    },
    
  });

  return Customer;
});
