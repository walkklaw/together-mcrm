var constants = require('./constants');

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
  /*
   * res.writeHead( '200', 'OK', { 'access-control-allow-origin': '*',
   * 'content-type': contentType } );
   */
  sendResponse(res, createResponse(constants.ERROR_CODE_0, 'OK', data));
};

exports.sendErrorMessage = exports.sendBusinessErrorMessage = function(res,
  errorMessage) {
  sendResponse(res, createResponse(constants.ERROR_CODE_1, errorMessage));
};

exports.sendSystemErrorMessage = function(res, errorMessage) {
  sendResponse(res, createResponse(constants.ERROR_CODE_2, errorMessage));
};

exports.crossDomainSupport = function(req, res) {
  if (req.method.toUpperCase() === 'OPTIONS') {
    res.writeHead('204', 'No Content', {
      'access-control-allow-origin' : '*',
      'access-control-allow-methods' : 'GET, POST, PUT, DELETE, OPTIONS',
      'access-control-allow-headers' : 'content-type, accept',
      'access-control-max-age' : 10, // Seconds.
      'content-length' : 0
    });
    return (res.end());
  }
};
