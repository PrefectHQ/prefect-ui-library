export type BlockDocumentCreate = {
  name: string,
  data: Record<string, unknown>,
  blockSchemaId: string,
  blockTypeId: string,
}