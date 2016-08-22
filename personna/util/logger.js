/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const  bunyan = require('bunyan');
// symbols
const _loggerKey = Symbol();
/**
 * Custom logger class
 */
class PersonnaLogger {
  constructor() {
    var ringBuffer = new bunyan.RingBuffer({ limit: 100 });
    this[_loggerKey] =  bunyan.createLogger({
      name: 'PersonnaLog',                
      streams: [
        {
          name: 'infoStream',
          level: 'info',
          stream: process.stdout            // log INFO and above to stdout
        },
        {
          name: 'errorStream',
          level: 'error',
          path: 'logs/personna.log'  // log ERROR and above to a file
        },
        {
          level: 'trace',
          type: 'raw',    // use 'raw' to get raw log record objects
          stream: ringBuffer
        }
      ],

      serializers: bunyan.stdSerializers,
      src: true,                     
    });
  }

  /**
   * Returns the logger instance
   * @return {[type]} [description]
   */
  getLogger() {
    return this[_loggerKey];
  }

  /**
   * Logs a warning using the created logger
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
   */
  logWarning(message) {
    this[_loggerKey].warn(message)
  }

  /**
   * Logs info using the created logger
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
   */
  logInfo(message) {
    this[_loggerKey].info(message);
  }

  /**
   * Logs error using the created logger
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
   */
  logError(message) {
    // console.log('--befor log')
    this[_loggerKey].error(message);
    // console.log('--after log')
  }
}

module.exports.PersonnaLogger = PersonnaLogger;
