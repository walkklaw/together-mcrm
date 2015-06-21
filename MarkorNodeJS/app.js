var express = require('express');
var MongooseUtils = require('./routes/MongooseUtils');

var host = (process.env.VCAP_APP_HOST || 'localhost');
// var host = (process.env.VCAP_APP_HOST || '12.139.41.106');
var port = (process.env.VCAP_APP_PORT || 4600);
var app = express();

function registerBasicRestApis(Models) {
  require('./routes/BasicApiRegister').registerBasicApis(app, Models);
}

function registerInitDBApi(Models) {
  app.get('/initDB', function(req, res) {
    require('./routes/DataUtils').initDB(Models, function suss() {
      res.write('Init DB successfully!');
      res.end();
    }, function sendRes() {
      res.write('Init DB failure!');
      res.end();
    });
  });
}

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.errorHandler());
  app.use(express.methodOverride());
  app.use(app.router);
});

// init mongodb and start listen
MongooseUtils.initConnection(function() {
  var schemaDefinitions = require('./routes/SchemaDefinitions');
  var Schemas = MongooseUtils.createSchemas(schemaDefinitions, true);
  var Models = MongooseUtils.createModels(Schemas);

  registerBasicRestApis(Models);
  registerInitDBApi(Models);

  app.listen(port, host);
  console.log('App started on port ' + port);
});
