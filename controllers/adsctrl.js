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

var ads = require('./adscontroller');
var log4js = require('log4js');
var logger = log4js.getLogger();
var util = require('util');
var ReadWriteLock = require('rwlock');   
var adsLock = new ReadWriteLock();


// ============================================================================
// swagAdsCommConfig
// ============================================================================
function swagAdsCommConfig(req, res) {
    logger.debug("--- swagAdsCommConfig ---");

    adsLock.writeLock( function (release) {
        logger.debug("got lock")
        var workCommOptions = ads.readAdsCommOptions();
        res.end();
        release();
    });
}


// ============================================================================
// swagAdsCommConfig
// ============================================================================
function swagGetVarNames(req, res) {
    logger.debug("--- swagGetVarNames ---");

    adsLock.writeLock( function (release) {
        logger.debug("got lock")
        var workCommOptions = ads.readAdsCommOptions();
        ads.getVarNames(workCommOptions, function (err, symbols) {
            logger.debug(symbols)
            // symbols is an array of json objects
            // var shortListSymbols
            // var j = 0;
            // for (var i in symbols) {
            //    if (symbols[i].name.includes("MAIN")) {
            //        shortListSymbols[j].push(symbols[i])
            //        j++
            //    }
            // }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(symbols));
            release();
        });
    });
}

// ============================================================================
// swagGetSpsVarValueHomeBridge
// ============================================================================
function swagGetSpsVarValueHomeBridge(req, res) {
    logger.debug("--- swagGetSpsVarValueHomeBridge");

    adsLock.writeLock( function (release) {
        logger.debug("got lock")
        var workCommOptions = ads.readAdsCommOptions();
        var workSpsVarName = req.swagger.params.spsVarName.value;
        logger.debug("spsVarName: "+ workSpsVarName);
        ads.getVarValue (workCommOptions, workSpsVarName, "ads.BOOL", function (err, value) {
                res.setHeader('Content-Type', 'application/json');
                if (value == true) {
                    value = 1;
                }
                if (value == false) {
                    value = 0;
                }
                res.end(JSON.stringify(value));
                // res.end(err, value);
                release();
        });
    });
}

// ============================================================================
// swagGetSpsVarValueHomeBridgeInverse
// ============================================================================
function swagGetSpsVarValueHomeBridgeInverse(req, res) {
    logger.debug("--- swagGetSpsVarValueHomeBridgeInverse");

    adsLock.writeLock( function (release) {
        logger.debug("got lock")
        var workCommOptions = ads.readAdsCommOptions();
        var workSpsVarName = req.swagger.params.spsVarName.value;
        logger.debug("spsVarName: "+ workSpsVarName);
        ads.getVarValue (workCommOptions, workSpsVarName, "ads.BOOL", function (err, value) {
                res.setHeader('Content-Type', 'application/json');
                if (value == false) {
                    value = 1;
                }
                if (value == true) {
                    value = 0;
                }
                res.end(JSON.stringify(value));
                // res.end(err, value);
                release();
        });
    });
}



// ============================================================================
// swagGetSpsVarValue
// ============================================================================
function swagGetSpsVarValue(req, res) {
    logger.debug("--- swagGetSpsVarValue");

    adsLock.writeLock( function (release) {
        logger.debug("got lock")
        var workCommOptions = ads.readAdsCommOptions();
        var workSpsVarName = req.swagger.params.spsVarName.value;
        logger.debug("spsVarName: "+ workSpsVarName);
        ads.getVarValue (workCommOptions, workSpsVarName, "ads.BOOL", function (err, value) {
                res.setHeader('Content-Type', 'application/json');
                var retBody = { 'varValue': value};
                res.end(JSON.stringify(retBody));
                // res.end(err, value);
                release();
        });
    });
}


// ============================================================================
// swagPutSpsVarValue
// ============================================================================
function swagPutSpsVarValue(req, res) {
    logger.debug("--- swagPutSpsVarValue ---");

    adsLock.writeLock( function (release) {
        var workCommOptions = ads.readAdsCommOptions()
        var workSpsVarName = req.swagger.params.spsVarName.value;
        logger.debug("spsVarName: " + workSpsVarName);
        var workBooleanValue;
        var workIntValue;
        //console.log(util.inspect(req.swagger.params.spsVarValue, {showHidden: false, depth: null}));
        workBooleanValue = req.swagger.params.spsVarValue.value;
        logger.debug("workBooleanValue.varValue: " + workBooleanValue.varValue);
        ads.putVarValue (workCommOptions, workSpsVarName, "ads.BOOL", workBooleanValue.varValue, function (err, value) {
                // res.setHeader('Content-Type', 'application/json');
                res.end()
                //res.end(err, value);
                release();
        });
        res.end();
    });
}


// ============================================================================
// swagPutVarBoolToTrue
// ============================================================================
function swagPutVarBoolToTrue(req, res) {
    logger.debug("--- swagPutVarBoolToTrue ---");

    adsLock.writeLock( function (release) {
        var workCommOptions = ads.readAdsCommOptions()
        var workSpsVarName = req.swagger.params.spsVarName.value;
        logger.debug("spsVarName: " + workSpsVarName + "set to true");
        ads.putVarValue (workCommOptions, workSpsVarName, "ads.BOOL", true, function (err, value) {
                res.end()
                release();
        });
        res.end();
    });    
}

// ============================================================================
// swagPutVarBoolToFalse
// ============================================================================
function swagPutVarBoolToFalse(req, res) {
    logger.debug("--- swagPutVarBoolToFalse ---");

    adsLock.writeLock( function (release) {
        var workCommOptions = ads.readAdsCommOptions()
        var workSpsVarName = req.swagger.params.spsVarName.value;
        logger.debug("spsVarName: " + workSpsVarName + "set to false");
        ads.putVarValue (workCommOptions, workSpsVarName, "ads.BOOL", false, function (err, value) {
                res.end()
                release();
        });
        res.end();
    });
}


// ============================================================================
// exports
// ============================================================================
module.exports = {
  "swagAdsCommConfig": swagAdsCommConfig,
  "swagGetVarNames": swagGetVarNames,
  "swagGetSpsVarValue": swagGetSpsVarValue,
  "swagGetSpsVarValueHomeBridge": swagGetSpsVarValueHomeBridge,
  "swagGetSpsVarValueHomeBridgeInverse": swagGetSpsVarValueHomeBridgeInverse,
  "swagPutVarBoolToTrue": swagPutVarBoolToTrue,
  "swagPutVarBoolToFalse": swagPutVarBoolToFalse,
  "swagPutSpsVarValue": swagPutSpsVarValue

}
