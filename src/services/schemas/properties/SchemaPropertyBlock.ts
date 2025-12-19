import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
import { BlockDocumentReferenceValue, BlockDocumentValue, isBlockDocumentReferenceValue, isBlockDocumentValue } from '@/models/api/BlockDocumentCreateRequest'
import { SchemaPropertyService } from '@/services/schemas/properties/SchemaPropertyService'
import { SchemaPropertyComponentWithProps } from '@/services/schemas/utilities'
import { SchemaValue } from '@/types/schemas'
import { isRecord, isString } from '@/utilities'

// The form stores block values as { blockDocumentId: string } without blockTypeSlug
// because SchemaFormInput.vue uses `${propKey}.blockDocumentId` as the field key
type PartialBlockDocumentValue = {
  blockDocumentId: string | null,
}

function isPartialBlockDocumentValue(value: SchemaValue): value is PartialBlockDocumentValue {
  return isRecord(value) && 'blockDocumentId' in value && (isString(value.blockDocumentId) || value.blockDocumentId === null)
}

export class SchemaPropertyBlock extends SchemaPropertyService {

  protected readonly default: BlockDocumentValue = {
    blockTypeSlug: this.property.blockTypeSlug!,
    blockDocumentId: this.getDefaultBlockDocumentId(),
  }

  protected override get component(): SchemaPropertyComponentWithProps {
    return this.withProps(BlockDocumentInput, {
      blockTypeSlug: this.property.blockTypeSlug!,
    })
  }

  protected request(value: SchemaValue): unknown {
    // Handle full BlockDocumentValue (has both blockTypeSlug and blockDocumentId)
    if (isBlockDocumentValue(value)) {
      if (!value.blockDocumentId) {
        return undefined
      }

      return this.createBlockDocumentReference(value.blockDocumentId)
    }

    // Handle partial value (only has blockDocumentId, from SchemaFormInput.vue)
    if (isPartialBlockDocumentValue(value)) {
      if (!value.blockDocumentId) {
        return undefined
      }

      return this.createBlockDocumentReference(value.blockDocumentId)
    }

    return value
  }

  private createBlockDocumentReference(blockDocumentId: string): BlockDocumentReferenceValue {
    return {
      $ref: {
        block_document_id: blockDocumentId,
      },
    }
  }

  protected response(value: SchemaValue): unknown {
    if (isBlockDocumentValue(value)) {
      return value
    }

    this.invalid()
  }

  private getDefaultBlockDocumentId(): string | null {
    if (isBlockDocumentReferenceValue(this.property.default)) {
      return this.property.default.$ref.block_document_id
    }

    return null
  }

}