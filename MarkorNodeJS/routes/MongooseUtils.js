var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.initConnection = function(success) {
  // mongo.url = 'mongodb://Teng
  // Sun/China/IBM:passw0rd@localhost:27017/industrial';
  var path = 'mongodb://localhost:27017/markor';

  var connection = mongoose.connection;

  connection.on('error', function() {
    console.log('Connection is refused');
  });

  connection.once('open', function() {
    success();
  });

  autoIncrement.initialize(connection);

  mongoose.connect(path);

  return this;
};

//Schemas: {name: mongoose schema}
exports.createModels = function(Schemas) {
  var models = {}, connection = mongoose.connection, name;
  for(name in Schemas) {
    models[name] = connection.model(name, Schemas[name]);
  }
  return models;
};

//schemaDefinitions: [{name: object(K-V pair)}]
exports.createSchemas = function createSchemas(schemaDefinitions, isAutoIncrement) {
  var schemas = {}, name;
  
  for (name in schemaDefinitions) {
    schemas[name] = new Schema(schemaDefinitions[name]);
  }

  if (isAutoIncrement) {
    for (name in schemas) {
      schemas[name].plugin(autoIncrement.plugin, {
        model : name,
        field : 'id',
        startAt : 1
      });
    }
  }

  return schemas;
};