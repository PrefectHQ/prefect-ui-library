import { Schema, SchemaValues } from '@/types/schemas'
import { stringify } from '@/utilities/json'

export function getSchemaValuesWithDefaults(
  values: SchemaValues,
  schema: Schema,
): SchemaValues {
  return {
    ...getSchemaDefaults(schema),
    ...values,
  }
}

export function getSchemaValuesWithDefaultsJson(
  values: SchemaValues,
  schema: Schema,
): string {
  const defaultValues = getSchemaValuesWithDefaults(values, schema)

  return stringify(defaultValues)
}

export function getSchemaDefaults(schema: Schema): SchemaValues {
  const values: SchemaValues = {}

  if (schema.properties) {
    Object.entries(schema.properties).forEach(([key, property]) => {
      if ('default' in property!) {
        values[key] = property.default
      }
    })
  }

  return values
}

export function convertObjectToRouteParameters(object: Record<string, unknown>): string {

  const queryString = Object.entries(object)
    .map(([key, value]) => {
      let stringValue
      if (Array.isArray(value)) {
        stringValue = JSON.stringify(value)
      } if (typeof value === 'object') {
        stringValue = JSON.stringify(value)
      } else if (typeof value === 'string') {
        stringValue = value
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        stringValue = value.toString()
      } else {
        stringValue = ''
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(stringValue)}`
    })
    .join('&')

  return queryString
}