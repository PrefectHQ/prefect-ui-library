import { SchemaResolver } from '@/services/schemas/resolvers/schemas'
import { Schema, SchemaDefinitions, SchemaProperties, SchemaProperty } from '@/types/schemas'
import { isNumberArray, isStringArray, mapValues } from '@/utilities'

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

  return mapValues(properties, (key, property) => resolveSchemaPropertyDefinition(property, definitions))
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

    resolved.allOf = resolvedAllOf
  }

  if (anyOf) {
    resolved.anyOf = anyOf.map(value => resolveSchemaPropertyDefinition(value, definitions)!)
  }

  if (items) {
    resolved.items = resolveSchemaPropertyDefinition(items, definitions)

    // if the property doesn't have a title or description try using the title and description from the items
    resolved.title ??= resolved.items?.title
    resolved.description ??= resolved.items?.description
  }

  if (!resolved.type) {
    if (isStringArray(resolved.enum)) {
      resolved.type = 'string'
    }

    if (isNumberArray(resolved.enum)) {
      resolved.type = 'integer'
    }
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

  if (schema.properties) {
    schema.properties = resolveSchemaPropertiesDefinitions(schema.properties, definitions)
  }

  return schema
}