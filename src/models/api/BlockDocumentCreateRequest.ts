export type BlockDocumentCreateRequest = {
  name: string,
  data: Record<string, unknown>,
  block_schema_id: string,
  block_type_id: string,
}