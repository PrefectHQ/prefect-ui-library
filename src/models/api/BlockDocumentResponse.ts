import { BlockSchemaResponse } from './BlockSchemaResponse'
import { BlockTypeResponse } from './BlockTypeResponse'

export type BlockDocumentResponseReferenceData = {
  $ref: {
    block_document_id: string,
  },
}

export type BlockDocumentResponseData = Record<string, unknown | BlockDocumentResponseReferenceData>

export type BlockDocumentResponse = {
  id: string,
  created: string,
  updated: string,
  name: string,
  data: Record<string, unknown>,
  block_schema_id: string,
  block_schema: BlockSchemaResponse,
  block_type_id: string,
  block_type: BlockTypeResponse,
  block_document_references: Record<string, unknown>,
}