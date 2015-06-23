'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var House = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/houses',

    idAttribute : '_id',

    defaults : {
      developer : '',
      address : '',
      building : '',
      deliveryDate : '',
      checkInDate : '',
      type : '',
      decorationCompany : '',
      designer : '',
      requirementId : 0,
    },

  });

  return House;
});
