import { SchemaValueMapper } from './SchemaValue'
import { SchemaValueArray } from './SchemaValueArray'
import { SchemaValueBoolean } from './SchemaValueBoolean'
import { SchemaValueNone } from './SchemaValueNull'
import { SchemaValueNumber } from './SchemaValueNumber'
import { SchemaValueObject } from './SchemaValueObject'
import { SchemaValueString } from './SchemaValueString'
import { SchemaValueUnknown } from './SchemaValueUnknown'
import { InvalidSchemaValueError } from '@/models'
import { Schema, schemaHas, SchemaProperties, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'

export type SchemaValuesServiceSource = {
  maxPropertyLevel?: number,
  initialPropertyLevel?: number,
}

export type SchemaValueMapperConstructor = new (source: Required<SchemaValuesServiceSource>) => SchemaValueMapper

type MapType = 'response' | 'request'

const DEFAULT_INITIAL_PROPERTY_LEVEL = 1
const DEFAULT_MAX_PROPERTY_LEVEL = 2

export class SchemaValuesMapper {
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
    return this.mapValues(values, schema, 'response')
  }

  public mapRequestValues(values: SchemaValues, schema: Schema): SchemaValues {
    return this.mapValues(values, schema, 'request')
  }

  // eslint-disable-next-line max-params
  private mapValues(values: SchemaValues, schema: SchemaProperty, type: MapType, level: number = this.initialPropertyLevel): SchemaValues {
    const properties: SchemaProperties = schema.properties ?? {}

    return Object.keys(properties).reduce<SchemaValues>((result, key) => {
      const property = properties[key] as SchemaProperty | undefined
      const value = values[key]


      if (property) {
        const requestValue = this.mapValue(value, property, type, level + 1)

        if (requestValue != this.getDefaultValueForProperty(property, level)) {
          result[key] = requestValue
        }
      }

      return result

    }, {})
  }

  // eslint-disable-next-line max-params
  private mapValue(value: SchemaValue, property: SchemaProperty, type: MapType, level: number): SchemaValue {
    const mapper = this.getMapperForProperty(property, level)

    try {
      return mapper[type]({
        property,
        value,
        level,
      })
    } catch (error) {
      if (!(error instanceof InvalidSchemaValueError)) {
        console.error(error)
      }
    }

    return mapper.default(property)
  }

  private getDefaultValueForProperty(property: SchemaProperty, level: number): SchemaValue {
    const mapper = this.getMapperForProperty(property, level)

    return mapper.default(property)
  }

  private getMapperForProperty(property: SchemaProperty, level: number): SchemaValueMapper {
    const constructor = this.getMapperConstructorForProperty(property)
    const instance = new constructor({
      initialPropertyLevel: level,
      maxPropertyLevel: this.maxPropertyLevel,
    })

    return instance
  }

  private getMapperConstructorForProperty(property: SchemaProperty): SchemaValueMapperConstructor {
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

export const schemaService = new SchemaValuesMapper()