import { Schema, SchemaDefinition, SchemaProperty } from '@/schemas/types/schema'

export function getSchemaDefinition(schema: Schema, definition: SchemaDefinition): SchemaProperty {
  const definitionKey = definition.replace('#/definitions/', '')
  const definitionSchema = schema.definitions?.[definitionKey]

  if (!definitionSchema) {
    throw new Error(`Definition not found for ${definition}`)
  }

  return definitionSchema
}