'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var OrderLosting = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/orderLostings',

    idAttribute : '_id',

    defaults : {
      lostingDate : '',
      reason : '',
      competitorPurchaseReason : '',
      requirementId : 0,
    },

  });

  return OrderLosting;
});
