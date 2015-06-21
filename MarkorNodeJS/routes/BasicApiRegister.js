var BasicApis = require('./BasicApis');

function registerBasicApiToApp(app, model) {
  var collectionPath = '/' + model.modelName;
  var idPath = collectionPath + '/:id';

  app.post(collectionPath, function(req, res) {
    BasicApis.create(model, req, res);
  });
  app.get(idPath, function(req, res) {
    BasicApis.findOne(model, req, res);
  });
  app.get(collectionPath, function(req, res) {
    BasicApis.query(model, req, res);
  });
  app.del(idPath, function(req, res) {
    BasicApis.del(model, req, res);
  });
  app.put(idPath, function(req, res) {
    BasicApis.update(model, req, res);
  });
}

exports.registerBasicApis = function(app, Models) {
  for(var name in Models) {
    registerBasicApiToApp(app, Models[name]);
  }
};