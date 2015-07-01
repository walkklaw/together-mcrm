var ResponseUtils = require('./ResponseUtils');

exports.commonCallback = function(res, handleResult) {
  return function(err, result) {
    if (!err) {
      handleResult && handleResult(result);
    } else {
      ResponseUtils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

exports.commonResponseCallback = function(res, handleResult) {
  return function(err, result) {
    if (!err) {
      ResponseUtils.sendCorrectMessage(res, handleResult(result));
    } else {
      ResponseUtils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

//Save Operation Callback function
exports.saveCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      ResponseUtils.sendCorrectMessage(res, {
        id : entity.id
      });
    } else {
      ResponseUtils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// Update Operation Callback function
exports.updateCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      if (entity) {
        ResponseUtils.sendCorrectMessage(res, {
          id : entity.id
        });
      } else {
        ResponseUtils.sendSystemErrorMessage(res, 'Could not Find');
      }
    } else {
      ResponseUtils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// Update Operation Callback function
exports.removeCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      if (entity) {
        ResponseUtils.sendCorrectMessage(res, {
          id : entity.id
        });
      } else {
        ResponseUtils.sendSystemErrorMessage(res, 'Could not Find');
      }
    } else {
      ResponseUtils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// FindOne Operation Callback function
exports.findOneCallback = function(res) {
  return function(err, entity) {
    if (!err) {
      ResponseUtils.sendCorrectMessage(res, entity);
    } else {
      ResponseUtils.sendSystemErrorMessage(res, err.stack);
    }
  };
};

// Query Operation Callback function
exports.queryCallback = function(res) {
  return function(err, entities) {
    if (!err) {
      ResponseUtils.sendCorrectMessage(res, entities);
    } else {
      ResponseUtils.sendSystemErrorMessage(res, err.stack);
    }
  };
};
