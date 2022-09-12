import { SchemaResolver } from './schemas'
import { Schema, SchemaDefinitions, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { mapEntries } from '@/utilities'

export const schemaDefinitionsResolver: SchemaResolver = (schema: Schema): Schema => {
  const { definitions, properties, ...rest } = schema
  const resolved: Schema = rest

  if (definitions && properties) {
    resolved.properties = resolveSchemaPropertiesDefinitions(properties, definitions)
  } else {
    resolved.properties = properties
  }

  return resolved
}

export function resolveSchemaPropertiesDefinitions(properties: SchemaProperties | undefined, definitions: SchemaDefinitions): SchemaProperties | undefined {
  if (!properties) {
    return undefined
  }

  return mapEntries(properties, (key, property) => resolveSchemaPropertyDefinition(property, definitions))
}

export function resolveSchemaPropertyDefinition(property: SchemaProperty | undefined, definitions: SchemaDefinitions): SchemaProperty | undefined {
  if (!property) {
    return undefined
  }

  const { $ref, properties, allOf, anyOf, items, ...rest } = property
  let resolved: SchemaProperty = rest

  // if this is a ref resolve and flatten
  if ($ref) {
    resolved = {
      ...resolved,
      ...resolveDefinition($ref, definitions),
    }
  }

  if (properties) {
    resolved.properties = resolveSchemaPropertiesDefinitions(properties, definitions)
  }

  if (allOf) {
    const resolvedAllOf = allOf.map(value => resolveSchemaPropertyDefinition(value, definitions)!)

    // if there is only one schema we flatten it and treat this property as a simple property
    if (resolvedAllOf.length === 1) {
      const [first] = resolvedAllOf

      resolved = {
        ...first,
        ...resolved,
      }
    } else {
      resolved.allOf = resolvedAllOf
    }
  }

  if (anyOf) {
    resolved.anyOf = anyOf.map(value => resolveSchemaPropertyDefinition(value, definitions)!)
  }

  if (items) {
    resolved.items = resolveSchemaPropertyDefinition(items, definitions)
  }

  return resolved
}

function resolveDefinition(ref: string, definitions: SchemaDefinitions): SchemaProperty | undefined {
  const [, match = ''] = ref.match(/^(?:#\/definitions\/)(.*)/) ?? []
  const schema = definitions[match]

  if (!schema) {
    return undefined
  }

  if (schema.blockTypeSlug) {
    schema.type = 'block'
  }

  return schemaDefinitionsResolver(schema)
}