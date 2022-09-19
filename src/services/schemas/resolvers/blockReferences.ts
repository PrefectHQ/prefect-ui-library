import { BlockDocumentReferencesResponse, BlockDocumentReferenceValue } from '@/models'
import { isSchemaValues, SchemaValues } from '@/types/schemas'
import { mapEntries } from '@/utilities'

export function schemaValuesBlockReferencesResolver(values: SchemaValues, references: BlockDocumentReferencesResponse | undefined): SchemaValues {
  if (references === undefined || Object.keys(references).length === 0) {
    return values
  }

  return mapEntries(values, (key, value) => {
    const reference = references[key]

    if (reference) {
      const resolved: BlockDocumentReferenceValue = {
        $ref: {
          // eslint-disable-next-line camelcase
          block_document_id: reference.block_document.id,
        },
      }

      return resolved
    }

    if (isSchemaValues(value)) {
      return schemaValuesBlockReferencesResolver(value, references)
    }

    return value
  })
}