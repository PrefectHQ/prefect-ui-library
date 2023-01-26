import { SchemaValue } from '@/types/schemas'

export type BlockDocumentReferenceValue = {
  $ref: {
    block_document_id: string,
  },
}

export function isBlockDocumentReferenceValue(value: SchemaValue): value is BlockDocumentReferenceValue {
  return typeof value === 'object' && value !== null && '$ref' in value
}

export type BlockDocumentValue = {
  blockTypeSlug: string,
  blockDocumentId: string | null,
}

export function isBlockDocumentValue(value: SchemaValue): value is BlockDocumentValue {
  return typeof value === 'object' && value !== null && 'blockTypeSlug' in value && 'blockDocumentId' in value
}

export type BlockDocumentRequestData = Record<string, unknown | BlockDocumentReferenceValue>

export type BlockDocumentCreateNamedRequest = {
  name: string,
  data: BlockDocumentRequestData,
  block_schema_id: string,
  block_type_id: string,
}

export type BlockDocumentCreateAnonymousRequest = Omit<BlockDocumentCreateNamedRequest, 'name'> & {
  is_anonymous: boolean,
}

export type BlockDocumentCreateRequest = BlockDocumentCreateNamedRequest | BlockDocumentCreateAnonymousRequest