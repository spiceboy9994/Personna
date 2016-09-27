/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
 "use strict"
const _modelsKey = Symbol();
class PersonaDataModels {
  static GetModels(identity) {
     // Load dependencies
    const adminModels = require('../models/data/admin/include.js')(identity);
    this[_modelsKey] = adminModels;
    return  this[_modelsKey];

  }
}

module.exports.PersonaDataModels = PersonaDataModels;