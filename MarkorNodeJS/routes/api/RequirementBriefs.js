var mongoose = require('mongoose');
var SchemaDefinitions = require('../SchemaDefinitions');
var CallBacks = require('../DbOprCallBacks');

var Requirements = mongoose.model('requirements');
var Users = mongoose.model('users');
var Customers = mongoose.model('customers');
var Stores = mongoose.model('stores');

var getModelFields = require('../APIUtils').getModelFields;

// CallBacks.queryCallback(res)
exports.getRequirementBriefs = function(req, res) {
  var query = Requirements.find(req.query).select(getModelFields(Requirements));
  query.populate('store', getModelFields(Stores));
  query.populate('primaryUser', getModelFields(Users));
  query.populate('customerId', getModelFields(Customers));
  query.exec(CallBacks.commonCallback(res, function(requirements) {
    return requirements.map(function(requirement) {
      return {
        createDate : requirement.createDate,
        store : requirement.store.alliance,
        level : requirement.level,
        primaryUser : requirement.primaryUser.name,
        status : requirement.status,
      };
    });
  }));
};
