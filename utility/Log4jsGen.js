'use strict';
var log4js = require('log4js');
var log4jsGen = {
    getLogger: function getLogger() {
        log4js.loadAppender('file');
        log4js.addAppender(log4js.appenders.file('./logs/ExecutionLog.log'), 'logs');
        var logger = log4js.getLogger('logs');
        return logger;
    }
};

module.exports = log4jsGen;



{
    "appenders": {
        "fileAppender": {
            "type": "dateFile",
            "filename": "./logs/t04_logging.log",
            "layout": {
                "type": "pattern",
                "pattern": "%d - %c:[%p]: %m"
            },
            "flags": "w",
            "pattern": ".yyyy-MM-dd-hh-mm-ss", 
            "compress": true,
            "alwaysIncludePattern": true
        }
    },
    "categories": {
        "default": {
            "appenders": ["fileAppender"],
            "level": "info"
        }
    }
}