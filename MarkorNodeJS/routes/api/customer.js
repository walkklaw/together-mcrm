var modelUtils = require('../utils/modelUtils');
var model = require('../model/customer');
var fields = "id name gender phones age birthday family characteristic comment userId";

exports.getDirectores = function(req, res) {
  modelUtils.create(model, req, res);
};

exports.getCustomer = function(req, res) {
  modelUtils.findOne(model, fields, req, res);
};

exports.getCustomers = function(req, res) {
  modelUtils.query(model, fields, req, res);
};

exports.deleteCustomer = function(req, res) {
  modelUtils.del(model, req, res);
};

exports.updateCustomer = function(req, res) {
  modelUtils.update(model, req, res);
};
