import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockTypeResponse } from '@/models/api/BlockTypeResponse'

export type BlockDocumentResponseData = Record<string, unknown>

export type BlockDocumentReferenceResponse = {
  block_document: {
    block_type: BlockTypeResponse,
    id: string,
    is_anonymous: boolean,
    name: string,
  },
}

export type BlockDocumentReferencesResponse = Record<string, BlockDocumentReferenceResponse | undefined>

export type BlockDocumentResponse = {
  id: string,
  created: string,
  updated: string,
  name: string,
  data: BlockDocumentResponseData,
  block_schema_id: string,
  block_schema: BlockSchemaResponse,
  block_type_id: string,
  block_type: BlockTypeResponse,
  block_document_references: BlockDocumentReferencesResponse,
  is_anonymous: boolean,
}