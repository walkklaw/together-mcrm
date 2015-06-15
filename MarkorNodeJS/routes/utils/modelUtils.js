var dbUtils = require('./dbUtils');
var Schema = require('mongoose').Schema;

exports.initModel = function(attrs, schemaName, notAutoIncrement) {
  // Enable pk auto Increment
  var schema = new Schema(attrs);

  !notAutoIncrement && (dbUtils.enableIdAutoIncrement(schema, schemaName));

  return dbUtils.getDBInstance().model(schemaName, schema);
};

// Create one Entity
exports.create = function(Model, req, res) {
  new Model(req.body).save(dbUtils.saveCallback(res));
};

// Find One Entity
exports.findOne = function(Model, fields, req, res) {
  Model.findOne({
    id : req.params.id
  }, fields, dbUtils.findOneCallback(res));
};

// Query Entities
exports.query = function(Model, fields, req, res) {
  Model.find(req.query, fields, dbUtils.queryCallback(res));
};

// Update One Entity
exports.update = function(Model, req, res) {
  delete req.body._id;
  delete req.body.id;
  Model.findOneAndUpdate({
    id : req.params.id
  }, {
    $set : req.body
  }, {
    upsert : false
  }, dbUtils.updateCallback(res));
};

// Delete One Entity
exports.del = function(Model, req, res) {
  Model.findOneAndRemove({
    id : req.params.id
  }, dbUtils.removeCallback(res));
};
