import { SchemaPropertyService } from './SchemaPropertyService'
import { BlockDocumentReferenceValue, isBlockDocumentReferenceValue } from '@/models/api/BlockDocumentCreateRequest'
import { InvalidSchemaValueError } from '@/models/InvalidSchemaValueError'
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

    this.invalid()
  }

  public readonly default = null

}