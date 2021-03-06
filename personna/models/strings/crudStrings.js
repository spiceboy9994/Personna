/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const util = require("util");

const _bsMessageKey  = Symbol();
/**
 * Contains all messages for Entity Crud operations
 */
class CrudStrings {
  static Messages(entityName, field, value) {
    return {
      COULD_NOT_SAVE: util.format('Could not Save %s', entityName),
      COULD_NOT_GET: util.format('Could not Get %s', entityName),
      ADDED: util.format('%s Succesfully Added', entityName),
      DELETED: util.format('%s Succesfully Deleted', entityName),
      UPDATED: util.format('%s Succesfully Saved', entityName),
      NOT_UNIQUE: util.format('%s with %s %s already exists', entityName, field, value),
    }
  }
}

module.exports.CrudStrings = CrudStrings;