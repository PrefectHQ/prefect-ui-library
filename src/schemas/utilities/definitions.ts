import merge from 'lodash.merge'
import { Schema, SchemaDefinition, SchemaProperty, isPropertyWith } from '@/schemas/types/schema'

export function getSchemaDefinition(schema: Schema, definition: SchemaDefinition): SchemaProperty {
  const definitionKey = definition.replace('#/definitions/', '')
  const definitionSchema = schema.definitions?.[definitionKey]

  if (!definitionSchema) {
    throw new Error(`Definition not found for ${definition}`)
  }

  return definitionSchema
}

export function mergeSchemaPropertyDefinition(property: SchemaProperty, schema: Schema): SchemaProperty {
  if (isPropertyWith(property, '$ref')) {
    const { $ref, ...rest } = property

    return merge({}, getSchemaDefinition(schema, $ref), rest)
  }

  return property
}