import { SchemaPropertyComponentWithProps } from '../utilities'
import { SchemaPropertyService } from './SchemaPropertyService'
import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
import { BlockDocumentReferenceValue, isBlockDocumentReferenceValue } from '@/models/api/BlockDocumentCreateRequest'
import { SchemaValue } from '@/types/schemas'

export class SchemaPropertyBlock extends SchemaPropertyService {

  protected readonly default = null

  protected override get component(): SchemaPropertyComponentWithProps {
    return this.withProps(BlockDocumentInput, {
      blockTypeSlug: this.property.blockTypeSlug!,
    })
  }

  protected request(value: SchemaValue): unknown {
    if (!value || typeof value !== 'string') {
      return value
    }

    const request: BlockDocumentReferenceValue = {
      $ref: {
        'block_document_id': value,
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

}