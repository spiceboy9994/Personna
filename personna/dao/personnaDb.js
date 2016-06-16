"use strict"
const url        = require('url'),
      parsedUrl  = url.parse(process.env.CONNECTION_STRING || 'mongodb://localhost:27017/personna'),
      Db         = require('mongodb').Db,
      Server     = require('mongodb').Server,
      Connection = require('mongodb').Connection,
      Q          = require("q");



let _connKey = Symbol();
let _connInfoKey = Symbol();

class PersonnaDb {
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
    // console.log('--> DB connection call');
    // mongoObject = new Db('your-db', new Server("127.0.0.1", Connection.DEFAULT_PORT, { auto_reconnect: true }));
    // db.open(function(error, databaseConnection) {
    //   if (error) throw new Error(error);
    //   console.log('---> Succesfully open connection');
    //   this[_connInfoKey] = databaseConnection;
    //   console.log(this[_connInfoKey]);
    //   callback(this[_connInfoKey]);
    // });
  }

  openConnection() {
    let deferred = Q.defer();
    console.log('--> DB connection call');
    console.log(this._connInstance);
    if (this._connInstance) {
      console.log('---> not need to create instance');
      deferred.resolve(this[_connInfoKey]);
    } else {
      let $this = this._connInstance;
      const mongoObject = new Db('your-db', new Server(this[_connInfoKey].host, this[_connInfoKey].port, { auto_reconnect: true }));
      mongoObject.open(function(error, databaseConnection) {
        if (error) throw new Error(error);
        // console.log('---> Succesfully open connection');
        // // console.log(databaseConnection);
        // console.log($this);
        //$this[_connKey] = databaseConnection;
        $this = databaseConnection;
        console.log('--> assigned symbol')
        console.log($this);
        deferred.resolve($this);
      });
    }
    return deferred.promise;
  } 
}

module.exports.PersonnaDb = PersonnaDb;