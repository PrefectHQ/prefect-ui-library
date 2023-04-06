import { BlockDocumentReferencesResponse, BlockDocumentValue, isBlockDocumentReferenceValue } from '@/models'
import { resolveSchemaPropertyDefinition } from '@/services'
import { isSchemaValues, Schema, SchemaValues } from '@/types/schemas'
import { mapValues } from '@/utilities'

export function schemaValuesBlockReferencesResolver(values: SchemaValues, references: BlockDocumentReferencesResponse | undefined): SchemaValues {
  if (references === undefined || Object.keys(references).length === 0) {
    return values
  }

  return mapValues(values, (key, value) => {
    const reference = references[key]

    if (reference) {
      const resolved: BlockDocumentValue = {
        blockTypeSlug: reference.block_document.block_type.slug,
        blockDocumentId: reference.block_document.id,
      }

      return resolved
    }

    if (isSchemaValues(value)) {
      return schemaValuesBlockReferencesResolver(value, references)
    }

    return value
  })
}

export function schemaValuesBlockReferencesWithSchemaResolver(values: SchemaValues, schema: Schema): SchemaValues {
  const { properties, definitions } = schema

  if (properties === undefined || definitions === undefined) {
    return values
  }

  return mapValues(values, (key, value) => {
    if (isBlockDocumentReferenceValue(value)) {
      const property = properties[key]
      if (property) {
        const resolvedProperty = resolveSchemaPropertyDefinition(property, definitions)

        return {
          blockTypeSlug: resolvedProperty?.blockTypeSlug,
          blockDocumentId: value.$ref.block_document_id,
        }
      }
    }

    return value
  })
}