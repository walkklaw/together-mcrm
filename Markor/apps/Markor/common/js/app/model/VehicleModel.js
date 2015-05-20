'use strict';

define([ "backbone", "app/Config", ], function(Backbone, Config) {

  var VehicleModel = Backbone.Model.extend({

    urlRoot : Config.API_URL + "/vehicles",

    defaults : {
      alias : "",
      drivers : [],
    },

  });

  return VehicleModel;
});
