var constants = require('./Constants');

function createResponse(statusCode, statusMessage, data) {
  return {
    statusCode : statusCode || '',
    statusMessage : statusMessage || '',
    data : data || {}
  };
}

function sendResponse(res, response) {
  res.write(JSON.stringify(response));
  res.end();
}

exports.sendCorrectMessage = function(res, data) {
  sendResponse(res, createResponse(constants.ERROR_CODE_0, 'OK', data));
};

exports.sendErrorMessage = exports.sendBusinessErrorMessage = function(res,
  errorMessage) {
  sendResponse(res, createResponse(constants.ERROR_CODE_1, errorMessage));
};

exports.sendSystemErrorMessage = function(res, errorMessage) {
  sendResponse(res, createResponse(constants.ERROR_CODE_2, errorMessage));
};