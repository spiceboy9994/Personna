"use strict"
// Imports
const url             = require('url'),
      connectionUrl   = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/personna',
      parsedUrl       = url.parse(connectionUrl),
      Db              = require('mongodb').Db,
      Server          = require('mongodb').Server,
      Connection      = require('mongodb').Connection,
      Q               = require("q"),
      mongoose        = require("mongoose"),
      dao             = require('./personnaDao'),
      autoIncrement   = require( 'mongoose-auto-increment' );
    


// Symbol Keys
const _connKey = Symbol();
const _connInfoKey = Symbol();
const _monConnKey = Symbol();
const _dataModelsKey = Symbol();
const _autoIncrementKey = Symbol();

/**
 * This class represents the DB Connection
 */
class PersonnaDb {
  /**
   * Class Constructor
   * @return {[type]} [description]
   */
  constructor() {
    let mongoObject = null;
    this[_connInfoKey] = {
      host:     parsedUrl.hostname,
      port:     parseInt(parsedUrl.port, 10),
      name:     parsedUrl.pathname.substr(1),
      user:     parsedUrl.auth ? parsedUrl.auth.split(':')[0] : null,
      password: parsedUrl.auth ? parsedUrl.auth.split(':')[1] : null
    };
    this._connInstance = null;
  }

  /**
   * Opens the DB connection using regular mongo db access
   * @return {[type]} [description]
   */
  openConnection() {
    let deferred = Q.defer();
    if (this[_connKey]) {
      console.log('---> not need to create instance');
      deferred.resolve(this[_connInfoKey]);
    } else {
      let $this = this;
      const mongoObject = new Db('your-db', new Server(this[_connInfoKey].host, this[_connInfoKey].port, { auto_reconnect: true }));
      mongoObject.open(function(error, databaseConnection) {
        if (error) throw new Error(error);
        console.log('---> Succesfully CREATED connection');
        $this[_connKey] = databaseConnection;
        // Initialize auto increment
        autoIncrement.initialize(databaseConnection);
        $this[_autoIncrementKey] = autoIncrement;
        deferred.resolve($this);
      });
    }
    return deferred.promise;
  } 

  /**
   * Opens a Mongo db connection
   * @return {[type]} [description]
   */
  openMongooseConnection() {
    mongoose.connect(connectionUrl); 

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {  
      console.log('Mongoose default connection open to ' + parsedUrl);
    }); 

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
    
    this[_dataModelsKey] = dao.PersonaDataModels.GetModels(this[_autoIncrementKey]);
   // require('../models/data/bodySectionModel');
  }

  dataModels() {
    return this[_dataModelsKey];
  }
}

module.exports.PersonnaDb = PersonnaDb;