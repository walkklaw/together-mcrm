'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var House = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/houses',

    defaults : {
      'developer': '',
      'address': '',
      'building': '',
      'deliveryDate': '',
      'checkInDate': '',
      'type': '',
      'decorationType': '',
      'decorationProgress': '',
      'state': '',
      'decorationCompany': '',
      'designer': '',
      'requirementId': 0
    },
    
  });

  return House;
});
