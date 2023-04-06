import { Schema, SchemaProperties, SchemaValues } from '@/types/schemas'
import { stringify } from '@/utilities/json'
import { mapEntries } from '@/utilities/object'

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

/*
 * @deprecated use `getSchemaDefaultValues` instead
 */
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

export function getSchemaPropertiesWithoutDefaults(
  schemaProperties: SchemaProperties = {},
): SchemaProperties {
  return mapEntries(schemaProperties, (key, property) => {
    // eslint-disable-next-line no-unused-vars
    const { default: __, ...rest } = property

    return [key, rest]
  })
}

export function getSchemaWithoutDefaults(schema: Schema): Schema {
  return {
    ...schema,
    properties: getSchemaPropertiesWithoutDefaults(schema.properties),
  }
}
