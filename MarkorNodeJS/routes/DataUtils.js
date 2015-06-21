var Promise = require('promise');

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

// Models: {modelName: string, model: mongoose model},
// success: func?, error: func?
exports.initDB = function initDB(Models, success, error) {
  var readFile = Promise.denodeify(require('fs').readFile);
  var modelAndPaths = [], name;
  success = success || log;
  error = error || log;
  
  for(name in Models) {
    modelAndPaths.push({
      fileName: name,
      model: Models[name],
    });
  }
  
  Promise.all(modelAndPaths.map(function(modelAndPath){
    var jsonFile = './routes/data/' + modelAndPath.fileName + '.json';
    
    return readFile(jsonFile, 'utf8').then(JSON.parse, function(err){
      log('Load and parseing ' + modelAndPath.fileName + ': ' + err);
    }).then(function(json) {
      return insertDataForModel(modelAndPath.model, json);
    }, function(err) {
      log('Inserting data for ' + modelAndPath.fileName + ': ' + err);
    });
  })).then(success, function(err) {
    log(err);
    error();
  });
}

