var mongoose = require('mongoose');
var SchemaDefinitions = require('../SchemaDefinitions');
var CallBacks = require('../DbOprCallBacks');

var Requirements = mongoose.model('requirements');
var TrackInfos = mongoose.model('trackInfos');
var Houses = mongoose.model('houses');
var Stores = mongoose.model('stores');
var Users = mongoose.model('users');

var getModelFields = require('../APIUtils').getModelFields;

function getCustomerNames(requirements) {
  var customers = {};
  requirements.forEach(function(requirement) {
    customers[requirement._id] = requirement.customerId.name;
  });
  return customers;
}

function getBuildings(houses) {
  var buildings = {};
  houses.forEach(function(house) {
    buildings[house.requirementId] = house.building;
  });
  return buildings;
}

function getBacklogsByRequirements(res, requirements) {
  var requirementIds = requirements.map(function(requirement) {
    return requirement._id;
  });

  // First, get the houses info by requirement ids
  var query = Houses.find({
    requirementId : {
      $in : requirementIds,
    },
  }).select('requirementId building');

  query.exec(CallBacks.commonCallback(res, function(houses) {
    // Second, get the trackinfos by requirement ids
    var query2 = TrackInfos.find({
      requirementId : {
        $in : requirementIds,
      },
    }).select(getModelFields(TrackInfos));
    query2.exec(CallBacks.commonResponseCallback(res, function(trackInfos) {
      var requirementId, backlog;
      var customers = getCustomerNames(requirements);
      var buildings = getBuildings(houses);
      var backlogs = [];

      for (var i = 0, len = trackInfos.length; i < len; i++) {
        // Soft copy the model object
        backlog = JSON.parse(JSON.stringify(trackInfos[i]));
        requirementId = backlog.requirementId;
        backlog.customer = customers[requirementId];
        backlog.building = buildings[requirementId]
        backlogs.push(backlog);
      }

      return backlogs;
    }));
  }));
}

exports.getBacklogsByUserId = function(req, res) {
  // get the requirements and customer(by populate) by user id
  var query = Requirements.find({
    primaryUser : req.params.userId,
  }).select('_id customerId').populate('customerId', 'name');

  query.exec(CallBacks.commonCallback(res, function(requirements) {
    getBacklogsByRequirements(res, requirements);
  }));
};

exports.getBacklogs = function(req, res) {
  // First, get stores by request query
  var query = Stores.find(req.query).select('_id');

  query.exec(CallBacks.commonCallback(res, function(stores) {
    // Second, get requirements by stores
    var query2 = Requirements.find({
      store : {
        $in : stores,
      },
    }).select('_id customerId').populate('customerId', 'name');

    query2.exec(CallBacks.commonCallback(res, function(requirements) {
      getBacklogsByRequirements(res, requirements);
    }));
  }));
};
