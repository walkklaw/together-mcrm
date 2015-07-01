var SchemaDefinitions = require('./SchemaDefinitions');

exports.getModelFields = function getModelFields(model) {
  return Object.keys(SchemaDefinitions[model.modelName]).join(' ') + ' _id';
}