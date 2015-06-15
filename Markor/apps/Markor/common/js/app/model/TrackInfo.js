'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var TrackInfo = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/trackInfos',

    defaults : {
      level : '',
      eventType : '',
      trackMethod : '',
      tractString : '',
      comment : [],
      nextTractTime : '',
      attachment : [],
      orderSum : 0,
      orderSerial : '',
      plannedString : '',
      detail : '',
      requirementId : 0,
    },
    
  });

  return TrackInfo;
});
