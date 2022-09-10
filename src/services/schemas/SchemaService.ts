import { SchemaPropertyArray } from './SchemaPropertyArray'
import { SchemaPropertyBlock } from './SchemaPropertyBlock'
import { SchemaPropertyBoolean } from './SchemaPropertyBoolean'
import { SchemaPropertyNone } from './SchemaPropertyNull'
import { SchemaPropertyNumber } from './SchemaPropertyNumber'
import { SchemaPropertyObject } from './SchemaPropertyObject'
import { SchemaPropertyService, SchemaPropertyServiceConstructor } from './SchemaPropertyService'
import { SchemaPropertyString } from './SchemaPropertyString'
import { SchemaPropertyUnknown } from './SchemaPropertyUnknown'
import { Schema, schemaHas, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'

export type SchemaValuesServiceSource = {
  maxPropertyLevel?: number,
  initialPropertyLevel?: number,
}

const DEFAULT_INITIAL_PROPERTY_LEVEL = 1
const DEFAULT_MAX_PROPERTY_LEVEL = 2

export class SchemaService {
  private readonly initialPropertyLevel: number
  private readonly maxPropertyLevel: number

  public constructor({
    maxPropertyLevel = DEFAULT_MAX_PROPERTY_LEVEL,
    initialPropertyLevel = DEFAULT_INITIAL_PROPERTY_LEVEL,
  }: SchemaValuesServiceSource = {}) {
    this.initialPropertyLevel = initialPropertyLevel
    this.maxPropertyLevel = maxPropertyLevel
  }

  public getSchemaDefaultValues(schema: Schema): SchemaValues {
    return this.mapPropertyResponseValue(schema) as SchemaValues
  }

  public getPropertyDefaultValue(property: SchemaProperty): SchemaValue {
    return this.mapPropertyResponseValue(property)
  }

  public mapSchemaResponseValues(schema: Schema, value: SchemaValue): SchemaValues {
    return this.mapPropertyResponseValue(schema, value) as SchemaValues
  }

  public mapPropertyResponseValue(property: SchemaProperty, value?: SchemaValue, level: number = this.initialPropertyLevel): SchemaValue {
    const service = this.getSchemaPropertyService(property, level)

    return service.mapResponseValue(value)
  }

  public mapSchemaRequestValues(schema: Schema, value: SchemaValue): SchemaValues {
    return this.mapPropertyRequestValue(schema, value) as SchemaValues
  }

  public mapPropertyRequestValue(property: SchemaProperty, value?: SchemaValue, level: number = this.initialPropertyLevel): SchemaValue {
    const service = this.getSchemaPropertyService(property, level)

    return service.mapRequestValue(value)
  }

  public getSchemaPropertyService(property: SchemaProperty, level: number): SchemaPropertyService {
    const constructor = this.getSchemaPropertyServiceConstructor(property)
    const service = new constructor({
      maxPropertyLevel: this.maxPropertyLevel,
      property,
      level,
    })

    return service
  }

  private getSchemaPropertyServiceConstructor(property: SchemaProperty): SchemaPropertyServiceConstructor {
    if (!schemaHas(property, 'type')) {
      // todo: handle properties with no type cause that's a thing apparently
      // check format? Maybe the "Unknown" mapper below works for this already?
      // console.log('property has no type:', property)
      if (schemaHas(property, 'enum')) {
        // console.log('has enum')
        return SchemaPropertyArray
      }
    }

    switch (property.type) {
      case 'string':
        return SchemaPropertyString
      case 'integer':
      case 'number':
        return SchemaPropertyNumber
      case 'boolean':
        return SchemaPropertyBoolean
      case 'null':
        return SchemaPropertyNone
      case 'array':
        return SchemaPropertyArray
      case 'object':
        return SchemaPropertyObject
      case 'block':
        return SchemaPropertyBlock
      case undefined:
        return SchemaPropertyUnknown
    }
  }

}

export const schemaService = new SchemaService()