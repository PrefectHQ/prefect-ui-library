import { BlockTypeResponse } from './BlockTypeResponse'
import { BlockSchemaFieldsType, BlockSchemaProperty, BlockSchemaCapability } from '@/models/BlockSchema'


export type BlockSchemaFieldsResponse = {
  title: string,
  description: string,
  type: BlockSchemaFieldsType,
  properties: Record<string, BlockSchemaProperty>,
  required: string[],
  block_type_name: string,
  block_schema_references: Record<string, unknown>,
}

export type BlockSchemaResponse = {
  id: string,
  created: string,
  updated: string,
  checksum: string,
  fields: BlockSchemaFieldsResponse,
  block_type_id: string,
  block_type: BlockTypeResponse,
  capabilities: BlockSchemaCapability[],
}