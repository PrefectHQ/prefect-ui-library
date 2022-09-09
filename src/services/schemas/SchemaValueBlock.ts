import { SchemaPropertyService } from './SchemaPropertyService'
import { BlockDocumentReferenceValue, isBlockDocumentReferenceValue } from '@/models/api/BlockDocumentCreateRequest'
import { SchemaValue } from '@/types/schemas'

export class SchemaValueBlock extends SchemaPropertyService {
  protected request(value: SchemaValue): unknown {
    if (!value || typeof value !== 'string') {
      return value
    }

    const request: BlockDocumentReferenceValue = {
      $ref: {
        // eslint-disable-next-line camelcase
        block_document_id: value,
      },
    }

    return request
  }

  protected response(value: SchemaValue): unknown {
    if (isBlockDocumentReferenceValue(value)) {
      return value.$ref.block_document_id
    }

    return value
  }

  protected get default(): unknown {
    throw new Error('Method not implemented.')
  }

}