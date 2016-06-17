"use strict"
const util = require("util");

const _bsMessageKey  = Symbol();
/**
 * Contains all messages for Entity Crud operations
 */
class CrudStrings {
  static Messages(entityName) {
    return {
      COULD_NOT_SAVE: util.format('Could not Save %s', entityName),
      ADDED: util.format('%s Succesfully Added', entityName),
      DELETED: util.format('%s Succesfully Deleted', entityName),
      UPDATED: util.format('%s Succesfully Saved', entityName)
    }
  }
}

module.exports.CrudStrings = CrudStrings;