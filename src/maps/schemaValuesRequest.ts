import { MapFunction } from '@/services/Mapper'
import { Schema, SchemaProperty, SchemaValue, SchemaValues } from '@/types/schemas'
import { isDate } from '@/utilities'

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: Schema,
}

export const mapSchemaValuesRequestToSchemaValues: MapFunction<MapSchemaValuesSource, SchemaValues> = function({ values, schema }: MapSchemaValuesSource): SchemaValues {
  console.group()
  const response = formatSchemaValues(values, schema)
  console.groupEnd()

  return response
}

function formatSchemaValues(values: SchemaValues, schema: Schema): SchemaValues {
  return Object.keys(values).reduce<SchemaValues>((result, key) => {
    const property = getSchemaProperty(schema, key)

    if (property) {
      result[key] = formatSchemaValue(values[key], property)
    }

    return result
  }, {})
}

function formatSchemaValue(value: SchemaValue, property: SchemaProperty): SchemaValue {
  switch (property.type) {
    case 'string':
      return formatStringProperty(value, property)
    case undefined:
      return formatUnknownProperty(value)
    default:
      return value
  }
}

function getSchemaProperty(schema: Schema, key: string): SchemaProperty | undefined {
  return schema.properties?.[key]
}

function formatStringProperty(value: SchemaValue, { format }: SchemaProperty): SchemaValue {
  switch (format) {
    case 'date':
    case 'date-time':
      return formatDateValue(value)
    default:
      return value
  }
}

function formatDateValue(value: SchemaValue): SchemaValue {
  if (isDate(value)) {
    return value.toISOString()
  }

  return value
}

function formatUnknownProperty(value: SchemaValue): SchemaValue {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value)
    }
  } catch (error) {
    console.error(error)
  }

  return value
}