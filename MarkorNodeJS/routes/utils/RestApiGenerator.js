function registerBasicApiToApp(app, apiObj) {
  var collectionPath = '/' + apiObj.docName;
  var idPath = collectionPath + '/:id';

  app.post(collectionPath, apiObj.create);
  app.get(idPath, apiObj.findOne);
  app.get(collectionPath, apiObj.find);
  app.del(idPath, apiObj.del);
  app.put(idPath, apiObj.update);

  return apiObj;
}

exports.generate = function(docName, schema, app) {
  var modelUtils = require('./modelUtils');
  var model = modelUtils.initModel(schema, docName);
  var fields = Object.getOwnPropertyNames(schema).join(' ');

  var apiObj = {
    model : model,

    docName : docName,

    create : function(req, res) {
      modelUtils.create(model, req, res);
    },

    del : function(req, res) {
      modelUtils.del(model, req, res);
    },

    update : function(req, res) {
      modelUtils.update(model, req, res);
    },

    find : function(req, res) {
      modelUtils.query(model, fields, req, res);
    },

    findOne : function(req, res) {
      modelUtils.findOne(model, fields, req, res);
    },
  };

  return app ? registerBasicApiToApp(app, apiObj) : apiObj;
};