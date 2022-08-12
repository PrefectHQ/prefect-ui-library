import { MapFunction } from '@/services/Mapper'
import { isValidJsonString } from '@/services/validate'
import { isSchemaValues, Schema, schemaHas, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesResponseToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function({ values, schema }: MapSchemaValuesSource): SchemaValues {
  console.group()
  const response = parseSchemaValues(values, schema)
  console.groupEnd()

  return response
}

function parseSchemaValues(values: SchemaValues, schema: Schema): SchemaValues {
  return Object.keys(values).reduce<SchemaValues>((result, key) => {
    const property = getSchemaProperty(schema, key)

    if (property) {
      result[key] = parseSchemaValue(values[key], property)
    }

    return result
  }, {})
}

function parseSchemaValue(value: SchemaValue, property: SchemaProperty): SchemaValue {
  switch (property.type) {
    case 'object':
      return parseObjectProperty(value, property)
    case 'array':
      return parseArrayProperty(value, property)
    case 'string':
      return parseStringProperty(value, property)
    case undefined:
      return parseUnknownProperty(value)
    default:
      return value
  }
}

function getSchemaProperty(schema: Schema, key: string): SchemaProperty | undefined {
  return schema.properties?.[key]
}

function parseObjectProperty(value: SchemaValue, property: SchemaProperty): SchemaValue {
  try {
    if (isSchemaValues(value)) {
      return parseSchemaValues(value, property)
    }
  } catch (error) {
    console.error(error)
  }

  return value
}

function parseArrayProperty(values: SchemaValue, property: SchemaProperty): SchemaValue {
  try {
    if (Array.isArray(values) && schemaHas(property, 'items')) {
      return values.map(value => parseSchemaValue(value, property.items))
    }
  } catch (error) {
    console.error(error)
  }

  return values
}

function parseStringProperty(value: SchemaValue, { format }: SchemaProperty): SchemaValue {
  switch (format) {
    case 'date':
    case 'date-time':
      return parseDateValue(value)
    default:
      return value
  }
}

function parseDateValue(value: SchemaValue): Date | SchemaValue {
  try {
    return new Date(value as string)
  } catch {
    return value
  }
}

function parseUnknownProperty(value: SchemaValue): SchemaValue {
  if (!isValidJsonString(value)) {
    return JSON.stringify(value)
  }

  return value
}