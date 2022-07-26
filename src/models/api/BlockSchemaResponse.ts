import { BlockTypeResponse } from './BlockTypeResponse'
import { BlockSchemaFieldsType, BlockSchemaProperty, BlockSchemaCapability } from '@/models/BlockSchema'

export type BlockSchemaReferenceResponse = {
  block_schema_checksum: string,
  block_type_slug: string,
}

export type BlockSchemaReferencesResponse = Record<string, BlockSchemaReferenceResponse | undefined>

export type BlockSchemaFieldsResponse = {
  title: string,
  description: string,
  type: BlockSchemaFieldsType,
  properties: Record<string, BlockSchemaProperty>,
  required: string[],
  block_type_slug: string,
  block_schema_references?: BlockSchemaReferencesResponse,
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