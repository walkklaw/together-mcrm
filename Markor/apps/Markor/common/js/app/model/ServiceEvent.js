'use strict';

define(
  [
    'backbone',
    'app/Config',
    'moment',
  ],
  function(Backbone, Config, Moment) {

    var ServiceEvent = Backbone.Model
      .extend(
        {

          urlRoot : Config.API_URL + '/serviceEvents',

          idAttribute : '_id',

          defaults : {
            category : '',
            completeTime : '',
            customerId : 0,
            comment : '',
            createTime : '',
            suggestedDeadline : 0,
            exceededDeadline : 0,
          },

          getDelayAndType : function() {
            var now = Moment().startOf('day'), createTime, result = {};
            var serviceEvent = this.toJSON();

            createTime = serviceEvent.createTime;

            if (Moment(createTime).add(serviceEvent.suggestedDeadline, 'd') > now) {
              result.delayType = 'health';
            } else if (Moment(createTime).add(serviceEvent.exceededDeadline,
              'd') > now) {
              result.delayType = 'exceeded';
            } else {
              result.delayType = 'terriblelyExceeded';
            }

            result.delay = (now - Moment(createTime)) / (3600 * 24 * 1000);
            return result;
          },

        }, {
          CATEGORY_NAMES : {
            visit : '待家访',
            draft : '待初稿',
            finalDraft : '待定稿',
            placeOrder : '待下单',
            finish : '待完结',
            summary : '总计',
          },
        });

    return ServiceEvent;
  });
