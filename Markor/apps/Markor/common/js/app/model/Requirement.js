'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var Requirement = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/requirements',

    defaults : {
      createTime: '',
      store: '',
      users: [],
      earnest: 0,
      predictedSale: 0,
      customerId: 0
    },
    
  });

  return Requirement;
});
