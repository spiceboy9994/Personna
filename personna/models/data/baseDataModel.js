"use strict"
const mongoose = require( 'mongoose' );
// const _schemaKey = Symbol();
const _schemaDefinition = Symbol();
const _schemaNameKey = Symbol();
const _modelKey = Symbol();
const _modelListKey = Symbol();

/**
 * Base Data Model to construct mongoose schemas and models
 */
class BaseDataModel {
  constructor(modelSettings, modelName) {
    this[_schemaDefinition] = modelSettings;
    this[_schemaNameKey] = modelName;
    let baseSchema = new mongoose.Schema(modelSettings);
    let model =  mongoose.model(modelName, baseSchema);
    this[_modelListKey] = model;
    //this[_modelKey] = new model();
  }

  // getSchema() {
  //   // console.log('done');
  //   // console.log(this[_schemaKey]);
  //   return this[_schemaKey];
  // }

  /**
   * Returns an instance on the mongoose model
   * @return {[type]} [description]
   */
  getModel() {
    let model = this[_modelListKey];
    this[_modelKey] = new model();
    return this[_modelKey];
  }

  /**
   * Returns the entity schema name
   * @return {[type]} [description]
   */
  getSchemaName() {
    return this[_schemaNameKey];
  }

  getModelList() {
    return this [_modelListKey];
  }
}

module.exports.BaseDataModel = BaseDataModel;