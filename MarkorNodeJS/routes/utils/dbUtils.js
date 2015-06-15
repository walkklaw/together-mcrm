/**
 * New node file
 */
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var utils = require('./utils');
var dbInstance = null;

exports.getDBInstance = function() {
  return dbInstance;
};

// Enable ID Auto Increment
exports.enableIdAutoIncrement = function(schema, modelName) {
  schema.plugin(autoIncrement.plugin, {
    model : modelName, field : 'id', startAt : 100
  });
};

exports.initMongoDBInstance = function(success) {
  var mongo = {
    hostname : '75.126.37.69',
    port : 10092,
    username : '707f1ab2-6ff7-4fd4-bc75-7c0728edf6ef',
    password : '3d0caa75-b0f4-47d5-a26e-a135574cd1cf',
    name : 'fc91e230-8124-41f2-9875-6c0df85bea28',
    db : 'db',
  };
  // mongo.url = 'mongodb://Teng
  // Sun/China/IBM:passw0rd@localhost:27017/industrial';
  mongo.url = 'mongodb://localhost:27017/markor';

  dbInstance = mongoose.createConnection(mongo.url);
  dbInstance.on('error', function() {
    console.log('Connection is refused');
  });
  autoIncrement.initialize(dbInstance);
  dbInstance.once('open', function() {
    success();
  });
};

// Save Operation Callback function
exports.saveCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      utils.sendCorrectMessage(res, {
        id : entity.id
      });
    } else {
      utils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// Update Operation Callback function
exports.updateCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      if (entity) {
        utils.sendCorrectMessage(res, {
          id : entity.id
        });
      } else {
        utils.sendSystemErrorMessage(res, 'Could not Find');
      }
    } else {
      utils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// Update Operation Callback function
exports.removeCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      if (entity) {
        utils.sendCorrectMessage(res, {
          id : entity.id
        });
      } else {
        utils.sendSystemErrorMessage(res, 'Could not Find');
      }
    } else {
      utils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// FindOne Operation Callback function
exports.findOneCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      utils.sendCorrectMessage(res, entity);
    } else {
      utils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// Query Operation Callback function
exports.queryCallback = function(res) {
  return function(err, entities) {
    if (!err) {
      utils.sendCorrectMessage(res, entities);
    } else {
      utils.sendSystemErrorMessage(res, err.stack);
    }
  };
};
