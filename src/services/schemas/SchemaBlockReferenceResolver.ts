import { BlockDocumentReferencesResponse, BlockDocumentReferenceValue } from '@/models'
import { isSchemaValues, SchemaValues } from '@/types/schemas'

export function resolveSchemaBlockDocumentReferences(values: SchemaValues, references: BlockDocumentReferencesResponse | undefined): SchemaValues {
  if (references === undefined || Object.keys(references).length === 0) {
    return values
  }

  return Object.keys(values).reduce<SchemaValues>((result, key) => {
    let value = values[key]
    const reference = references[key]

    if (reference) {
      const resolved: BlockDocumentReferenceValue = {
        $ref: {
          // eslint-disable-next-line camelcase
          block_document_id: reference.block_document.id,
        },
      }

      value = resolved
    }

    if (isSchemaValues(value)) {
      value = resolveSchemaBlockDocumentReferences(value, references)
    }

    result[key] = value

    return result
  }, {})

}