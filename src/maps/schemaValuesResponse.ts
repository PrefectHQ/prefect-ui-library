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

    // todo: need to return a valid default rather than just the value
    return value
  }

  const getSchemaProperty = (schema: Schema, key: string): SchemaProperty | undefined => {
    return schema.properties?.[key]
  }

  const parseObjectProperty = (value: SchemaValue, property: SchemaProperty): Record<string, unknown> | null => {
    const parsed = parseUnknownJson(value)

    if (!isSchemaValues(parsed)) {
      // todo: invalid meta
      return null
    }

    return parseSchemaValues(parsed, property)
  }

  const parseArrayProperty = (values: SchemaValue, property: SchemaProperty): unknown[] => {
    if (!Array.isArray(values) || !schemaHas(property, 'items')) {
      // todo: invalid meta
      return []
    }

    return values.map(value => parseSchemaValue(value, property.items))
  }

  const parseStringProperty = (value: SchemaValue, { format }: SchemaProperty): string | Date | null => {
    if (typeof value !== 'string') {
      // todo: invalid meta
      return null
    }

    switch (format) {
      case 'date':
      case 'date-time':
        return parseDateValue(value)
      default:
        return value
    }
  }

  const parseDateValue = (value: SchemaValue): Date | null => {
    const date = this.map('string', value as string, 'Date')

    if (!isValid(date)) {
      // todo: invalid meta
      return null
    }

    return date
  }

  function parseUnknownProperty(value: SchemaValue): SchemaValue {
    if (!isValidJsonString(value)) {
      return JSON.stringify(value)
    }

    return value
  }

  function parseInteger(value: SchemaValue): number | null {
    const result = parseInt(value as string)

    if (isNaN(result)) {
      return null
    }

    return result
  }

  function parseNumber(value: SchemaValue): number | null {
    const result = parseFloat(value as string)

    if (isNaN(result)) {
      // todo: invalid meta
      return null
    }

    return result
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

    if (typeof value !== 'boolean') {
      // todo: invalid meta
      return false
    }

    return value
  }

  const response = parseSchemaValues(values, schema)

  return response
}

