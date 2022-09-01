import { isValid } from 'date-fns'
import { InvalidSchemaValueError } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { isValidJsonString } from '@/services/validate'
import { isSchemaValues, Schema, schemaHas, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'
import { getSchemaPropertyDefaultValue, INITIAL_PROPERTY_LEVEL, MAX_PROPERTY_DEFAULT_VALUE, MAX_PROPERTY_LEVEL } from '@/utilities'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesResponseToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function({ values, schema }: MapSchemaValuesSource): SchemaValues {

  const parseSchemaValues = (values: SchemaValues, schema: Schema, level: number = INITIAL_PROPERTY_LEVEL): SchemaValues => {
    const properties = schema.properties ?? {}

    return Object.keys(properties).reduce<SchemaValues>((result, key) => {
      const property = getSchemaProperty(schema, key)

      if (property) {
        result[key] = parseSchemaValue(values[key], property, level + 1)
      }

      return result
    }, {})
  }

  const parseSchemaValue = (value: SchemaValue, property: SchemaProperty, level: number = INITIAL_PROPERTY_LEVEL): SchemaValue => {
    if (property.type === 'object' && level > MAX_PROPERTY_LEVEL) {
      return parseMaxLevelProperty(value)
    }

    switch (property.type) {
      case 'object':
        return parseObjectProperty(value, property, level)
      case 'array':
        return parseArrayProperty(value, property)
      case 'string':
        return parseStringProperty(value, property)
      case undefined:
        return parseUnknownProperty(value, property)
      case 'integer':
        return parseInteger(value, property)
      case 'number':
        return parseNumber(value, property)
      case 'boolean':
        return parseBoolean(value, property)
      case 'null':
      default:
        return value
    }
  }

  const getSchemaProperty = (schema: Schema, key: string): SchemaProperty | undefined => {
    return schema.properties?.[key]
  }

  const parseMaxLevelProperty = (value: SchemaValue): string => {
    // typescript is just wrong. JSON.stringify can return null or undefined
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return stringifyUnknownJson(value) ?? MAX_PROPERTY_DEFAULT_VALUE
  }

  const parseObjectProperty = (value: SchemaValue, property: SchemaProperty, level: number): Record<string, unknown> | null => {
    try {
      const parsed = parseUnknownJson(value)

      if (!isSchemaValues(parsed)) {
        throw new InvalidSchemaValueError()
      }

      return parseSchemaValues(parsed, property, level)
    } catch (error) {
      handleError(error)
    }

    const defaultValue = getSchemaPropertyDefaultValue(property)

    return parseSchemaValues(defaultValue, property, level)
  }

  const parseArrayProperty = (values: SchemaValue, property: SchemaProperty): unknown[] => {
    try {
      if (!Array.isArray(values) || !schemaHas(property, 'items')) {
        throw new InvalidSchemaValueError()
      }

      return values.map(value => parseSchemaValue(value, property.items))
    } catch (error) {
      handleError(error)
    }

    return getSchemaPropertyDefaultValue(property)
  }

  const parseStringProperty = (value: SchemaValue, property: SchemaProperty): string | Date | null => {
    try {
      if (typeof value !== 'string') {
        throw new InvalidSchemaValueError()
      }

      switch (property.format) {
        case 'date':
        case 'date-time':
          return parseDateValue(property, value)
        default:
          return value
      }
    } catch (error) {
      handleError(error)
    }

    return getSchemaPropertyDefaultValue(property)
  }

  const parseDateValue = (property: SchemaProperty, value: SchemaValue): Date => {
    try {
      const date = this.map('string', value as string, 'Date')

      if (!isValid(date)) {
        throw new InvalidSchemaValueError()
      }

      return date
    } catch (error) {
      handleError(error)
    }

    throw getSchemaPropertyDefaultValue(property)
  }

  const parseUnknownProperty = (value: SchemaValue, property: SchemaProperty): SchemaValue => {
    try {
      if (!isValidJsonString(value)) {
        return JSON.stringify(value)
      }

      return value
    } catch (error) {
      handleError(error)
    }

    return getSchemaPropertyDefaultValue(property)
  }

  const parseInteger = (value: SchemaValue, property: SchemaProperty): number | null => {
    try {
      const result = parseInt(value as string)

      if (isNaN(result)) {
        throw new InvalidSchemaValueError()
      }

      return result
    } catch (error) {
      handleError(error)
    }

    return getSchemaPropertyDefaultValue(property)
  }

  const parseNumber = (value: SchemaValue, property: SchemaProperty): number | null => {
    try {
      const result = parseFloat(value as string)

      if (isNaN(result)) {
        throw new InvalidSchemaValueError()
      }

      return result
    } catch (error) {
      handleError(error)
    }

    return getSchemaPropertyDefaultValue(property)
  }

  const parseBoolean = (value: SchemaValue, property: SchemaProperty): boolean | null => {
    try {
      if (typeof value === 'string') {
        if (value.toLowerCase() === 'true') {
          return true
        }

        if (value.toLowerCase() === 'false') {
          return false
        }
      }

      if (typeof value !== 'boolean') {
        throw new InvalidSchemaValueError()
      }

      return value
    } catch (error) {
      handleError(error)
    }

    return getSchemaPropertyDefaultValue(property)
  }

  const handleError = (error: unknown): void => {
    if (error instanceof InvalidSchemaValueError) {
      return
    }

    console.error(error)
  }

  return parseSchemaValues(values, schema)
}

