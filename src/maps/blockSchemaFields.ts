import { BlockSchemaFieldsResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchemaFields } from '@/models/BlockSchema'
import { MapFunction } from '@/services/Mapper'

export const mapBlockSchemaFieldsResponseToBlockSchemaFields: MapFunction<BlockSchemaFieldsResponse, BlockSchemaFields> = function(source: BlockSchemaFieldsResponse): BlockSchemaFields {
  return {
    title: source.title,
    description: source.description,
    type: source.type,
    properties: source.properties,
    required: source.required,
    blockTypeName: source.block_type_name,
    blockSchemaReferences: source.block_schema_references,
  }
}