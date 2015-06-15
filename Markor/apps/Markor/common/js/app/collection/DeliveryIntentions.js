'use strict';

define([
  "backbone",
  "model/DeliveryIntention",
  'app/Config',
], function(Backbone, DeliveryIntention, Config) {

  var DeliveryIntentions = Backbone.Collection.extend({

    url : Config.API_URL + "/deliveryIntentions",

    model : DeliveryIntention,

  });

  DeliveryIntentions.datas = new DeliveryIntentions([
    {
      "id" : 1,
      "liftDoorSize" : "1米",
      "staircaseDoorSize" : "1米",
      "houseDoorSize" : "1.5米",
      "liftSize" : "1米乘1米",
      "staircaseSize" : "1米",
      "roomDoorSize" : "1米",
      "needCarryThroughStair" : false,
      "needHangingDecoration" : false,
      "floor" : 4,
      "hangingDecorationComment" : "",
      "requirementId" : 1
    },
    {
      "id" : 2,
      "liftDoorSize" : "1米",
      "staircaseDoorSize" : "1米",
      "houseDoorSize" : "1.5米",
      "liftSize" : "1米乘1米",
      "staircaseSize" : "1米",
      "roomDoorSize" : "1米",
      "needCarryThroughStair" : true,
      "needHangingDecoration" : false,
      "floor" : 5,
      "hangingDecorationComment" : "",
      "requirementId" : 2
    },
    {
      "id" : 3,
      "liftDoorSize" : "1米",
      "staircaseDoorSize" : "1米",
      "houseDoorSize" : "1.5米",
      "liftSize" : "1米乘1米",
      "staircaseSize" : "1米",
      "roomDoorSize" : "1米",
      "needCarryThroughStair" : false,
      "needHangingDecoration" : true,
      "floor" : 6,
      "hangingDecorationComment" : "",
      "requirementId" : 3
    } ]);

  return DeliveryIntentions;
});
