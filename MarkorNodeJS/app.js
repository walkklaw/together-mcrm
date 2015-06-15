var express = require('express');
var utils = require('./routes/utils/utils');
var dbUtils = require('./routes/utils/dbUtils');
var host = (process.env.VCAP_APP_HOST || 'localhost');
// var host = (process.env.VCAP_APP_HOST || '12.139.41.106');
var port = (process.env.VCAP_APP_PORT || 4600);
var app = express();

function registerBasicRestApis() {
  var RestApiGenerator = require('./routes/utils/RestApiGenerator');
  var Schemas = require('./routes/Schemas');
  var apiObjs = [];
  
  // Register restful apis
  for(var docName in Schemas) {
    apiObjs.push(RestApiGenerator.generate(docName, Schemas[docName], app));
  }
  return apiObjs;
}

function registerInitDBApi(modelAndPaths) {
  app.get('/initDB', function(req, res){
    require('./routes/utils/DataUtils').initDB(modelAndPaths, function suss(){
      res.write('Init DB successfully!');
      res.end();
    }, function sendRes() {
      res.write('Init DB failure!');
      res.end();
    });
  });
}

function createModelAndPaths(apiObjs){
  return apiObjs.map(function(apiObj){
    apiObj.fileName = apiObj.docName;
    return apiObj;
  });
}

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.errorHandler());
  app.use(express.methodOverride());
  app.use(app.router);
});

// init mongodb and start listen
dbUtils.initMongoDBInstance(function() {
  var apiObjs = registerBasicRestApis();
  registerInitDBApi(createModelAndPaths(apiObjs));
  
  app.listen(port, host);
  console.log('App started on port ' + port);
});
