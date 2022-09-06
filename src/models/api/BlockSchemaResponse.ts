import { BlockTypeResponse } from './BlockTypeResponse'
import { SchemaResponse } from './SchemaResponse'

export type BlockSchemaReferenceResponse = {
  block_schema_checksum: string,
  block_type_slug: string,
}

export type BlockSchemaReferencesResponse = Record<string, BlockSchemaReferenceResponse | undefined>

export type BlockSchemaResponse = {
  id: string,
  created: string,
  updated: string,
  checksum: string,
  fields: SchemaResponse,
  block_type_id: string,
  block_type: BlockTypeResponse,
  capabilities: string[],
}