import { BlockSchemaPropertyType } from '../BlockSchema'

export type BlockDocumentFilterRequest = {
  block_schema_type?: BlockSchemaPropertyType,
  offset?: number,
  limit?: number,
}