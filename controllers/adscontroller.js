// ============================================================================
// License (MIT)
// Copyright (c) 2016 tlumpp
// ============================================================================
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
//IN THE SOFTWARE.
// ============================================================================

'use strict'

var ads = require('ads'),
    fs = require('fs'),
    log4js = require('log4js'),
    logger = log4js.getLogger(),
    props = require('properties-parser');



// ============================================================================
// readAdsCommOptions
// read ads communication parameter from controllers folder
// required input parameters are: host, amsNetIdTarget, amsNetIdSource
// (further parameters are allowed)
// ============================================================================
// here some details on the config file parameters
//The IP or hostname of the target machine
//    host: "1.1.1.1",
//The NetId of the target machine
//    amsNetIdTarget: "1.1.1.1.1.1",
//The NetId of the source machine.
//You can choose anything in the form of x.x.x.x.x.x,
//but on the target machine this must be added as a route.
// Note this id is NOT the ip-address of the server
// on windows start beckhoff system manager and choose "Zielsystem"
// then you will see the local address
//  amsNetIdSource: "1.1.1.1.1.1",
//OPTIONAL: (These are set by default)
//The tcp destination port
//port: 48898
//The ams source port
//amsPortSource: 32905
//The ams target port
//amsPortTarget: 801
// ============================================================================
function readAdsCommOptions() {
  // var funcoptions;
  logger.debug("--- readAdsCommOptions ---")
  var configFilePath = '../ads-restful-srv-config/adscommoptions.cfg';
  // read configuration from file
  var config = props.read(configFilePath);
  logger.debug("host: " + config.host);
  logger.debug("amsNetIdTarget: " + config.amsNetIdTarget);
  logger.debug("amsNetIdSource " + config.amsNetIdSource);
  return config;
}




// ============================================================================
// function getVarNames
// input: options
// input: varName
// input: adsType (?? currently provided as string)
// output: callback is a callback function with (err, symbols)
// ============================================================================
function getVarNames (options, callback) {
    var client = ads.connect(options, function() {
        logger.debug("--- callback: ads.connect ---");
        this.getSymbols(function(err,symbols) {
        // Question ????? wie macht man hier richtiges error handling ???
            console.log("--- callback: getSymbols ---");
            console.log(symbols)
            if (err)
              logger.debug("error");
            return callback (null, symbols)
            this.end();
        });
    });
}



// ============================================================================
// function putVarValue
// input: options
// input: varName
// input: adsType (?? currently provided as string)
// output: callback is a callback function with (err, value)
//         (value is type of boolean)
// ============================================================================
function putVarValue (options, varName, adsType, varValue, callback) {
    logger.debug("--- putVarValue ---")

    var err;

    // input parameter check for parameter: options
    if ( (options.host == undefined) ||
         (options.amsNetIdSource == undefined) ||
         (options.amsNetIdTarget == undefined)
       ) {
         callback(err, null)
         return
    }

    // input parameter check for parameter: varname
    if (varName === undefined) {
        logger.debug("err - varName is not definded")
        // ?? err not defined
        callback(err, null)
    }

    // input parameter check for parameter: adsType and my
    // ?? needs to be improved adsType is currently a string.
    logger.debug("adsBool: " + adsType)
    switch(adsType) {// currently only ads.Bool allowed
      case "ads.BOOL":
          switch(varValue) {
              case true:
                  varValue = 1;
                  break;
              case false:
                  varValue = 0;
                  break;
              default:
                  logger.debug("err - varValue is neither true(1) nor false(0)")
                  // ?? err not defined
                  callback(err, null)
                  return;
                  break;
          }
          break;
      default:
          logger.debug("err - no ads type defined")
          // ?? err not defined
          callback(err, null)
          return;
          break;
    }
    logger.debug("--- ads.connect ---")
    var client = ads.connect(options, function() {
    logger.debug("--- callback: ads.connect ---");
    logger.debug("varname: "+varName);
    var myHandle = {
        symname: varName,
        bytelength: ads.BOOL,
        propname: 'value',
        value: varValue
    };
    logger.debug("myHandle.symname: " + myHandle.symname)
    logger.debug("myHandle.bytelength: " + myHandle.bytelength)
    logger.debug("myHandle.value: " + myHandle.value)
    logger.debug("--- write ---")
    this.write(myHandle, function(err) {
        logger.debug("--- callback: write ---");
        logger.debug("--- read ---")
        this.read(myHandle, function(err, handle) {
            logger.debug("--- callback: read ---")
            if (varValue == 1)
                handle.value = true;
            if (varValue == 0)
                handle.value = false;
            logger.debug("read value: " + handle.value)    ;
            this.end();
            return callback (null, handle.value);
        });
        if (err) {
            logger.debug("error - could not write variable: " + err);
            return callback (err, Null);
            }
        });
    });
}






// ============================================================================
// function getVarValue
// input: options (communication options)
// input: varName
// input: adsType (?? currently provided as string)
// output: callback is a callback function with (err, value)
//         (value is type of boolean)
// ============================================================================
function getVarValue (options, varName, adsType, callback) {
    var err;

    logger.debug("--- getVarValue ---");

    // input parameter check for parameter: options
    if ( (options.host == undefined) ||
         (options.amsNetIdSource == undefined) ||
         (options.amsNetIdTarget == undefined)
       ) {
         // ?? err not defined
         callback(err, null)
         return
    }

    // input parameter check for parameter: varname
    if (varName === undefined) {
        logger.debug("err - varName is not definded")
        // ?? err not defined
        callback(err, null)
    }

    // input parameter check for parameter: adsType
    // ?? needs to be improved adsType is currently a string.
    logger.debug("adsBool: " + adsType)
    switch(adsType) {// currently only ads.Bool allowed
      case "ads.BOOL":
          break;
      default:
          logger.debug("err - no ads type defined")
          // ?? err not defined
          callback(err, null)
          return;
          break;
    }

    // establish connection to SPS
    logger.debug("ads.connect")
    var client = ads.connect(options, function() {
        logger.debug("--- callback: ads.connect ---");

        var myHandle = {
                symname: varName,
                bytelength: ads.BOOL,
                propname: 'value'
        };
        // read parameter value
        logger.debug("--- read ---");
        logger.debug("varname: "+varName+" ")
        this.read(myHandle, function(err, handle) {
            logger.debug("--- callback: read ---");
            if (err) {
                logger.debug("error: " + err);
                callback(err, null)
                return
            }
            switch(adsType) {// currently only ads.Bool allowed
              case "ads.BOOL":
                  if (handle.value == 1) {
                      handle.value = true;
                  }
                  if (handle.value == 0) {
                      handle.value = false;
                  }
                  break;
              default:
                  // this path should never be touched due to checking at beginning
                  callback(err, null)
                  return
            }
            logger.debug("read value: " + handle.value)    ;
            this.end();
            callback (null, handle.value);
            // return
        });
    });
}


// ============================================================================
// exports
// ============================================================================
module.exports = {
  "readAdsCommOptions": readAdsCommOptions,
  "getVarNames": getVarNames,
  "getVarValue": getVarValue,
  "putVarValue": putVarValue
}
