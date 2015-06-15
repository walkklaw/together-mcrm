'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var Requirement = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/requirements',

    defaults : {
      createDate : '',
      store : 0,
      primaryUser : 0,
      secondaryUsers : [],
      earnest : 0,
      predictedSale : 0,
      orderSum : 0,
      status : '',
      customerId : 0,
      creater : 0,
    },
    
  });

  return Requirement;
});
