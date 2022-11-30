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