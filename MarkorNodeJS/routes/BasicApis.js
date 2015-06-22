var CallBacks = require('./DbOprCallBacks');
var SchemaDefinitions = require('./SchemaDefinitions');

var getModelFields = require('./APIUtils').getModelFields;

// Create one Entity
exports.create = function(model, req, res) {
  model.create(req.body, CallBacks.saveCallback(res));
};

// Find One Entity
exports.findOne = function(model, req, res) {
  model.findOne({
    id : req.params.id
  }, getModelFields(model), CallBacks.findOneCallback(res));
};

// Query Entities
exports.query = function(model, req, res) {
  model.find(req.query, getModelFields(model), CallBacks
    .queryCallback(res));
};

// Update One Entity
exports.update = function(model, req, res) {
  delete req.body._id;
  delete req.body.id;
  model.findOneAndUpdate({
    id : req.params.id
  }, {
    $set : req.body
  }, {
    upsert : false
  }, CallBacks.updateCallback(res));
};

// Delete One Entity
exports.del = function(model, req, res) {
  model.findOneAndRemove({
    id : req.params.id
  }, CallBacks.removeCallback(res));
};
