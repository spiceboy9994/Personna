

/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const Q  = require('q');
const oauthProviders = require('./oauthProviders').OauthProviders;

const _oauthClientKey = Symbol();
const _oauthScopesKey = Symbol();
// const _rootPathKey = Symbol();
const _tokenDirKey = Symbol();
const _tokenDirPathKey = Symbol();



class GoogleAuthenticator {

  constructor(path) {
    let config = oauthProviders.getGoogle();
    this[_oauthClientKey] = new OAuth2(config.clientId, config.clientSecret, config.callbackUrl);
    // this[_rootPathKey] = path;

    this[_tokenDirKey] = path + "/googleTokens"
    this[_tokenDirPathKey] = this[_tokenDirKey] + "/personnaGym.json";
  }

  authorizeLocal() {
    let deferred = Q.defer();
    console.log('--> in');
    let $this = this;
    fs.readFile(this[_tokenDirPathKey], function(err, token) {
      console.log('--token read');
      console.log(token);
      console.log(err);
      if (err) {
        deferred.reject(err);
      } else {
        console.log('-> success from local token');
        $this[_oauthClientKey].credentials = JSON.parse(token);
        deferred.resolve($this[_oauthClientKey]);
      }
    });
    // deferred.resolve('data');
    return deferred.promise;
  }

  authorize(req, callback) {
    // var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
    // Check if we have previously stored a token.
    fs.readFile(tokenDir, function(err, token) {
      if (err) {
        getNewToken(req);
      } else {
        this[_oauthClientKey].credentials = JSON.parse(token);
        callback(this[_oauthClientKey]);
      }
    });
  }

  getNewTokenUrl() {
    var authUrl = this[_oauthClientKey].generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive']
    });
    //req.redirectUrl(authUrl);
    console.log('Authorize this app by visiting this url: ', authUrl);
    return authUrl;
  }

  storeTokenLocally(code) {
    let deferred = Q.defer();
    let $this = this;
    
    this[_oauthClientKey].getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        deferred.reject(err);
      }
      console.log('---> token ');
      console.log(token);
      $this[_oauthClientKey].credentials = token;
      $this.storeToken(token);
      deferred.resolve($this[_oauthClientKey]);
    });

    return deferred.promise;
  }

  storeToken(token) {
    try {
      fs.mkdirSync(this[_tokenDirKey]);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(this[_tokenDirPathKey], JSON.stringify(token));
    console.log('Token stored to ' + this[_tokenDirPathKey]);
  }

  // requestAccessCode() {
  //    const url = this[_oauthClientKey].generateAuthUrl({
  //     access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  //     scope: this[_oauthScopesKey] // If you only need one scope you can pass it as string
  //   });
  // }

}

module.exports.GoogleAuthenticator = GoogleAuthenticator;