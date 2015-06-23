'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var DeliveryIntention = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/deliveryIntentions',

    idAttribute : '_id',

    defaults : {
      liftDoorSize : '',
      staircaseDoorSize : '',
      houseDoorSize : '',
      liftSize : '',
      staircaseSize : '',
      roomDoorSize : '',
      needCarryThroughStair : false,
      needHangingDecoration : false,
      floor : 0,
      hangingDecorationComment : '',
      requirementId : 0,
    },

  });

  return DeliveryIntention;
});
