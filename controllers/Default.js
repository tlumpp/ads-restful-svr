'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.swagAdsCommConfig = function swagAdsCommConfig (req, res, next) {
  Default.swagAdsCommConfig(req.swagger.params, res, next);
};

module.exports.swagGetSpsVarValue = function swagGetSpsVarValue (req, res, next) {
  Default.swagGetSpsVarValue(req.swagger.params, res, next);
};

module.exports.swagPutSpsVarValue = function swagPutSpsVarValue (req, res, next) {
  Default.swagPutSpsVarValue(req.swagger.params, res, next);
};
