import { SchemaPropertyService, SchemaPropertyServiceConstructor } from './SchemaPropertyService'
import { SchemaValueArray } from './SchemaValueArray'
import { SchemaValueBoolean } from './SchemaValueBoolean'
import { SchemaValueNone } from './SchemaValueNull'
import { SchemaValueNumber } from './SchemaValueNumber'
import { SchemaValueObject } from './SchemaValueObject'
import { SchemaValueString } from './SchemaValueString'
import { SchemaValueUnknown } from './SchemaValueUnknown'
import { Schema, schemaHas, SchemaProperties, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'

export type SchemaValuesServiceSource = {
  maxPropertyLevel?: number,
  initialPropertyLevel?: number,
}

type MapType = 'mapResponseValue' | 'mapRequestValue'

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

  public getDefaultValues(schema: Schema): SchemaValues {
    return this.mapResponseValues({}, schema)
  }

  public mapResponseValues(values: SchemaValues, schema: Schema): SchemaValues {
    return this.mapValues(values, schema, 'mapResponseValue')
  }

  public mapRequestValues(values: SchemaValues, schema: Schema): SchemaValues {
    return this.mapValues(values, schema, 'mapRequestValue')
  }

  // eslint-disable-next-line max-params
  private mapValues(values: SchemaValues, schema: SchemaProperty, type: MapType, level: number = this.initialPropertyLevel): SchemaValues {
    const properties: SchemaProperties = schema.properties ?? {}

    return Object.keys(properties).reduce<SchemaValues>((result, key) => {
      const property = properties[key] as SchemaProperty | undefined
      const value = values[key]

      if (property) {
        const mappedValue = this.mapValue(value, property, type, level + 1)

        if (type == 'mapRequestValue' && mappedValue !== undefined) {
          result[key] = mappedValue
        } else {
          result[key] = mappedValue
        }
      }

      return result

    }, {})
  }

  // eslint-disable-next-line max-params
  private mapValue(value: SchemaValue, property: SchemaProperty, type: MapType, level: number): SchemaValue {
    const mapper = this.getMapperForProperty(property, level)

    return mapper[type](value)
  }

  private getMapperForProperty(property: SchemaProperty, level: number): SchemaPropertyService {
    const constructor = this.getMapperConstructorForProperty(property)
    const instance = new constructor({
      maxPropertyLevel: this.maxPropertyLevel,
      property,
      level,
    })

    return instance
  }

  private getMapperConstructorForProperty(property: SchemaProperty): SchemaPropertyServiceConstructor {
    if (!schemaHas(property, 'type')) {
      // todo: handle properties with no type cause that's a thing apparently
      // check format? Maybe the "Unknown" mapper below works for this already?
    }

    switch (property.type) {
      case 'string':
        return SchemaValueString
      case 'integer':
      case 'number':
        return SchemaValueNumber
      case 'boolean':
        return SchemaValueBoolean
      case 'null':
        return SchemaValueNone
      case 'array':
        return SchemaValueArray
      case 'object':
        return SchemaValueObject
      case undefined:
        return SchemaValueUnknown
    }

  }

}

export const schemaService = new SchemaService()