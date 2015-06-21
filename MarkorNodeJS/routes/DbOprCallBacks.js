var utils = require('./ResponseUtils');

//Save Operation Callback function
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
