import type { SchemaProperty } from '@/schemas/types/schema'
import type { SchemaValue } from '@/schemas/types/schemaValues'

export function getSchemaPropertyDefaultValue(property: SchemaProperty): SchemaValue {
  if (property.const !== undefined) {
    return property.const
  }

  if (property.default !== undefined) {
    return property.default
  }

  if (property.type === 'object' && property.properties !== undefined) {
    return Object.entries(property.properties).reduce<Record<string, unknown>>((value, [key, property]) => {
      if (property.default !== undefined) {
        value[key] = property.default
      }

      return value
    }, {})
  }

  return undefined
}
