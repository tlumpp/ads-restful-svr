'use strict';

exports.swagAdsCommConfig = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  // no response value expected for this operation
  
  
  res.end();
}

exports.swagGetSpsVarValue = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spsVarName (String)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "varValue" : true
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.swagPutSpsVarValue = function(args, res, next) {
  /**
   * parameters expected in the args:
  * spsVarName (String)
  * spsVarValue (BoolVal)
  **/
  // no response value expected for this operation
  
  
  res.end();
}

