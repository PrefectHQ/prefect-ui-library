import { BlockSchemaFieldsResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchemaFields } from '@/models/BlockSchema'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities'

export const mapBlockSchemaFieldsResponseToBlockSchemaFields: MapFunction<BlockSchemaFieldsResponse, BlockSchemaFields> = function(source: BlockSchemaFieldsResponse): BlockSchemaFields {
  return {
    ...mapSnakeToCamelCase(source),
    blockSchemaReferences: source.block_schema_references ? this.map('BlockSchemaReferencesResponse', source.block_schema_references, 'BlockSchemaReferences') : {},
  }
}