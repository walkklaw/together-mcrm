var Promise = require('promise');
var modelUtils = require('./modelUtils');
var Schemas = require('../Schemas');

// docNames: string array, return object array
function getModels(docNames) {
  var models = [], len = docNames.length, schema, docName;

  for (var i = 0; i < len; i++) {
    docName = docNames[i];
    schema = Schemas[docName];
    schema && models.push(modelUtils.initModel(schema, docName));
  }
  return models;
}

// model: mongoose model, json: object
function insertDataForModel(model, json) {
  model.collection.drop();
  
  return new Promise(function (fulfill, reject){
    model.collection.insert(json, {
      w : 1
    }, function(err, result) {
      if (err) {
        reject && reject(err);
      } else {
        fulfill && fulfill(result);
      }
    });
  });
}

function log(arg){
  console.log(arg);
};

// modelAndPathArr: {fileName: string, model: mongoose model},
// success: func?, error: func?
exports.initDB = function initDB(modelAndPaths, success, error) {
  var readFile = Promise.denodeify(require('fs').readFile);
  success = success || log;
  error = error || log;
  
  Promise.all(modelAndPaths.map(function(modelAndPath){
    var jsonFile = './routes/data/' + modelAndPath.fileName + '.json';
    
    return readFile(jsonFile, 'utf8').then(JSON.parse, function(err){
      log('Load and parseing ' + modelAndPath.fileName + ': ' + err);
    }).then(function(json) {
      return insertDataForModel(modelAndPath.model, json);
    }, function(err) {
      log('Inserting data for ' + modelAndPath.fileName + ': ' + err);
    });
  })).then(success).catch(error);
}

