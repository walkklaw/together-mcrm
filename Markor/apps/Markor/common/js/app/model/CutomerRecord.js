'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var CutomerRecord = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/cutomerRecords',

    idAttribute : '_id',

    defaults : {
      userId : 0,
      start : '',
      end : '',
      isEffective : false,
    },

  });

  return CutomerRecord;
});
