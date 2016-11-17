/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
/**
 * Oauth providers config class
 */
class OauthProviders {
  static getFacebook() {
    return {
      clientId: process.env.PERSONA_FB_CLIENTID,
      clientSecret: process.env.PERSONA_FB_CLIENT_SECRET,
      callbackURL: process.env.PERSONA_FB_CALLBACK_URL,
    }
  }

  static getGoogle() {
    return {
      clientId: process.env.PERSONA_GO_CLIENTID,
      clientSecret: process.env.PERSONA_GO_CLIENT_SECRET,
      callbackUrl: process.env.PERSONA_GO_CLIENT_CALLBACK,
    }
  }

  static getTwitter() {
    return {
      clientId: process.env.PERSONA_TW_CLIENTID,
      clientSecret: process.env.PERSONA_TW_CLIENT_SECRET,
      callbackUrl: process.env.PERSONA_TW_CLIENT_CALLBACK,
    }
  }
}

module.exports.OauthProviders = OauthProviders;