'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var PerchaseIntention = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/perchaseIntentions',

    idAttribute : '_id',

    defaults : {
      roomPlanning : '',
      style : '',
      category : '',
      series : '',
      requirementId : 0,
    },

  });

  return PerchaseIntention;
});
