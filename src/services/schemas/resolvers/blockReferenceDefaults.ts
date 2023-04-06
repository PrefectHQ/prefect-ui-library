import { isBlockDocumentReferenceValue } from '@/models/api/BlockDocumentCreateRequest'
import { SchemaResolver } from '@/services/schemas/resolvers/schemas'
import { getSchemaValueDefinition } from '@/services/schemas/utilities'
import { Schema, SchemaProperties, SchemaProperty } from '@/types'
import { mapValues } from '@/utilities/object'

export const schemaBlockReferenceDefaultValuesResolver: SchemaResolver = (schema: Schema): Schema => {
  const { properties, ...rest } = schema
  const resolved: Schema = rest

  resolved.properties = resolveSchemaPropertyBlockReferenceDefaultValues(properties)

  return resolved
}

function resolveSchemaPropertyBlockReferenceDefaultValues(properties: SchemaProperties | undefined): SchemaProperties | undefined {
  if (!properties) {
    return undefined
  }

  return mapValues(properties, (key, property) => resolveSchemaPropertyBlockReferenceDefaultValue(property))
}

function resolveSchemaPropertyBlockReferenceDefaultValue(property: SchemaProperty | undefined): SchemaProperty | undefined {
  if (!property) {
    return undefined
  }

  const resolved: SchemaProperty = { ...property }

  if (isBlockDocumentReferenceValue(property.default)) {
    const definition = getSchemaValueDefinition(property, property.default)

    if (definition) {
      resolved.default = {
        blockDocumentId: property.default.$ref.block_document_id,
        blockTypeSlug: definition.blockTypeSlug,
      }
    }
  }

  return resolved

}