import { BlockTypeResponse } from './BlockTypeResponse'
import { SchemaResponse } from './SchemaResponse'

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