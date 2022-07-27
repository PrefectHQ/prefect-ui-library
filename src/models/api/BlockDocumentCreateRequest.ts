export type BlockDocumentCreateRequestReferenceData = {
  $ref: {
    block_document_id: string,
  },
}

export type BlockDocumentRequestData = Record<string, unknown | BlockDocumentCreateRequestReferenceData>

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