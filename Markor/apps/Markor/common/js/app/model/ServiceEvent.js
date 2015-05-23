'use strict';

define([ 'backbone', 'app/Config', ], function(Backbone, Config) {

  var ServiceEvent = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/serviceEvents',

    defaults : {
      category: '',
      completeTime: '',
      customerId: 0,
      comment: '',
      createTime: '',
      suggestedDeadline: 0,
      exceededDeadline: 0,
    },

  });

  return ServiceEvent;
});
