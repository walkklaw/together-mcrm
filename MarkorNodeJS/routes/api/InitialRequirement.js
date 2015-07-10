var mongoose = require('mongoose');
var CallBacks = require('../DbOprCallBacks');

var Requirements = mongoose.model('requirements');
var DeliveryIntention = mongoose.model('deliveryIntentions');
var Houses = mongoose.model('houses');
var PerchaseIntention = mongoose.model('perchaseIntentions');
var OrderLosting = mongoose.model('orderLostings');
var TrackInfos = mongoose.model('trackInfos');

var ResponseUtils = require('../ResponseUtils');

function createDocForModel(model, jsonObj) {
  return new Promise(function(fulfill, reject) {
    model.create(jsonObj, function(err, result) {
      if (err) {
        reject && reject(err);
      } else {
        fulfill && fulfill(result);
      }
    });
  });
}

exports.initializeRequirement = function(req, res) {
  var initialJson = {};
  var requirement;
  createDocForModel(Requirements, req.body).then(function(doc) {
    requirement = doc;
    initialJson.requirementId = requirement._id;
    return createDocForModel(DeliveryIntention, initialJson);
  }).then(function() {
    return createDocForModel(Houses, initialJson);
  }).then(function() {
    return createDocForModel(PerchaseIntention, initialJson);
  }).then(function() {
    return createDocForModel(OrderLosting, initialJson);
  }).then(function() {
    var result = requirement.toJSON();
    delete result.__v;
    ResponseUtils.sendCorrectMessage(res, result);
  }).catch(function(err){
    ResponseUtils.sendSystemErrorMessage(res, err.stack);
  });
};
