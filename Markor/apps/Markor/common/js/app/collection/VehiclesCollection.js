'use strict';
define([ "backbone", "model/VehicleModel", "app/Config",

], function(Backbone, VehicleModel, model) {

  var VehiclesCollection = Backbone.Collection.extend({

    url : Config.API_URL + "/vehicles",

    model : VehicleModel,

  });

  return VehiclesCollection;
});
