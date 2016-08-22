/************  Copyright ************/
/* Year: 2016
 * Author: David Espino
*/
"use strict"
const mongoose = require( 'mongoose' );
// const autoIncrement = require( 'mongoose-auto-increment' );
// const _schemaKey = Symbol();
const _schemaDefinition = Symbol();
const _schemaNameKey = Symbol();
const _modelKey = Symbol();
const _modelListKey = Symbol();
const _modelSchemaKey = Symbol();
const _relTypes = {
  ONE_TO_ONE: 'one',
  ONE_TO_FEW: 'one_few',
  ONE_TO_MANY: 'one_many',
  ONE_TO_FEW_INLINE: 'one_few_inline',
  ONE_TO_ONE_REF: 'one_one_ref',
};
//const _autoIncrementKey = Symbol();

/**
 * Base Data Model to construct mongoose schemas and models
 */
class BaseDataModel {
  constructor(modelSettings, modelName, relationships, autoIncrementField, autoIncrement) {
    // create simple models (catalog based)
    if (arguments.length === 2) {
      this[_schemaDefinition] = modelSettings;
      this[_schemaNameKey] = modelName;
      let baseSchema = new mongoose.Schema(modelSettings);
      let model =  mongoose.model(modelName, baseSchema);
      this[_modelListKey] = model;
      this[_modelSchemaKey] = baseSchema; 
    } else if(arguments.length === 5) {
      // create complex model including relationships and auto increment field
      this[_schemaDefinition] = modelSettings;
      this[_schemaNameKey] = modelName;
      let objectId = mongoose.Schema.ObjectId;
      // adding relationships
      relationships.forEach(rel => {
        switch (rel.type) {
          case _relTypes.ONE_TO_ONE: 
          //   modelSettings[rel.fieldName] = rel.childModel.getModelSchema();
          //   break;
          // }
          case _relTypes.ONE_TO_FEW_INLINE: {
            modelSettings[rel.fieldName] = [rel.childModel.getModelSchema()];
            break
          }
          case _relTypes.ONE_TO_FEW: 
          case _relTypes.ONE_TO_MANY:
          case _relTypes.ONE_TO_ONE_REF: {
            console.log('child model ---> ' + rel.childModel.getModelSchema())
            modelSettings[rel.fieldName] = [{ type: objectId, ref: rel.childModel.getModelSchema() }];
            break;
          }
        } 
      });
      let baseSchema = new mongoose.Schema(modelSettings);
       // check if there is any auto Increment Field
      if (autoIncrementField) {
        baseSchema.plugin(autoIncrement.plugin, {
          model: modelName,
          field: autoIncrementField,
          startAt: 1,
          incrementBy: 1,
        });
      }
      let model =  mongoose.model(modelName, baseSchema);
      this[_modelListKey] = model;
      this[_modelSchemaKey] = baseSchema;
      //this[_autoIncrementKey] = autoIncrementField;
    }
  }

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
  getModelSchema() {
    return this[_schemaNameKey];
  }

  /**
   * Returns the entity schema name
   * @return {[type]} [description]
   */
  getSchemaName() {
    return this[_schemaNameKey];
  }

  /**
   * Returns the Mongo Object that points to a list
   * @return {[type]} [description]
   */
  getModelList() {
    return this[_modelListKey];
  }

  static relationShipTypes() {
    return _relTypes;
  }
}

module.exports.BaseDataModel = BaseDataModel;