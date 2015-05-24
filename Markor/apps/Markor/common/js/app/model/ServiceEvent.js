'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var ServiceEvent = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/serviceEvents',

    defaults : {
      category : '',
      completeTime : '',
      customerId : 0,
      comment : '',
      createTime : '',
      suggestedDeadline : 0,
      exceededDeadline : 0,
    },

  }, {
    CATEGORY_NAMES : {
      visit : '待家访',
      draft : '待初稿',
      finalDraft : '待定稿',
      placeOrder : '待下单',
      finish : '待完结',
      summary : '总计',
    }
  });

  return ServiceEvent;
});
