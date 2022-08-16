import { isValid } from 'date-fns'
import { MapFunction } from '@/services/Mapper'
import { isValidJsonString } from '@/services/validate'
import { isSchemaValues, Schema, schemaHas, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'
import { parseUnknownJson } from '@/utilities'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesResponseToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function({ values, schema }: MapSchemaValuesSource): SchemaValues {

  const parseSchemaValues = (values: SchemaValues, schema: Schema): SchemaValues => {
    return Object.keys(values).reduce<SchemaValues>((result, key) => {
      const property = getSchemaProperty(schema, key)

      if (property) {
        result[key] = parseSchemaValue(values[key], property)
      }

      return result
    }, {})
  }

  const parseSchemaValue = (value: SchemaValue, property: SchemaProperty): SchemaValue => {
    try {
      switch (property.type) {
        case 'object':
          return parseObjectProperty(value, property)
        case 'array':
          return parseArrayProperty(value, property)
        case 'string':
          return parseStringProperty(value, property)
        case undefined:
          return parseUnknownProperty(value)
        case 'integer':
          return parseInteger(value)
        case 'number':
          return parseNumber(value)
        case 'boolean':
          return parseBoolean(value)
        case 'null':
        default:
          return value
      }
    } catch (error) {
      console.error(error)
    }

    return value
  }

  const getSchemaProperty = (schema: Schema, key: string): SchemaProperty | undefined => {
    return schema.properties?.[key]
  }

  const parseObjectProperty = (value: SchemaValue, property: SchemaProperty): SchemaValue => {
    const parsed = parseUnknownJson(value)

    if (isSchemaValues(parsed)) {
      return parseSchemaValues(parsed, property)
    }

    return parsed
  }

  const parseArrayProperty = (values: SchemaValue, property: SchemaProperty): SchemaValue => {
    if (Array.isArray(values) && schemaHas(property, 'items')) {
      return values.map(value => parseSchemaValue(value, property.items))
    }

    return values
  }

  const parseStringProperty = (value: SchemaValue, { format }: SchemaProperty): SchemaValue => {
    switch (format) {
      case 'date':
      case 'date-time':
        return parseDateValue(value)
      default:
        return value
    }
  }

  const parseDateValue = (value: SchemaValue): Date | SchemaValue => {
    const date = this.map('string', value as string, 'Date')

    if (isValid(date)) {
      return date
    }

    return value
  }

  function parseUnknownProperty(value: SchemaValue): SchemaValue {
    if (!isValidJsonString(value)) {
      return JSON.stringify(value)
    }

    return value
  }

  function parseInteger(value: SchemaValue): number {
    return parseInt(value as string)
  }

  function parseNumber(value: SchemaValue): number {
    return parseFloat(value as string)
  }

  function parseBoolean(value: SchemaValue): boolean {
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        return true
      }

      if (value.toLowerCase() === 'false') {
        return false
      }
    }

    return !!value
  }

  console.group()
  const response = parseSchemaValues(values, schema)
  console.groupEnd()

  return response
}

