export type BlockDocumentCreateRequestReferenceData = {
  $ref: {
    block_document_id: string,
  },
}

export type BlockDocumentCreateRequestData = Record<string, unknown | BlockDocumentCreateRequestReferenceData>

export type BlockDocumentCreateRequest = {
  name: string,
  data: BlockDocumentCreateRequestData,
  block_schema_id: string,
  block_type_id: string,
}