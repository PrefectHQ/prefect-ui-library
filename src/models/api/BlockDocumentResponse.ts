import { BlockSchemaResponse } from './BlockSchemaResponse'
import { BlockTypeResponse } from './BlockTypeResponse'

export type BlockDocumentResponseData = Record<string, unknown>

// this is an incomplete model. All we need is the id and this model is
// likely to go away because of api changes so not filling it out completely
export type BlockDocumentResponseDocumentReference = {
  block_document: {
    id: string,
  },
}

export type BlockDocumentResponseReferences = Record<string, BlockDocumentResponseDocumentReference>

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
  block_document_references: BlockDocumentResponseReferences,
}