import { Schema, SchemaProperties } from '@/types/schemas'
import { mapEntries } from '@/utilities/object'

function getSchemaPropertiesWithoutDefaults(
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
