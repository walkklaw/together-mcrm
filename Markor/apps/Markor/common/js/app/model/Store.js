'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var Store = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/stores',

    defaults : {
      city : '',
      address : '',
      alliance : '',
    },
    
  });

  return Store;
});
