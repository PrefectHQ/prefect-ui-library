import { BlockDocumentReferencesResponse, BlockDocumentValue } from '@/models'
import { isSchemaValues, SchemaValues } from '@/types/schemas'
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