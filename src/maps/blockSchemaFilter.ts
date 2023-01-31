import { BlockSchemaFilterRequest } from '@/models/api/BlockSchemaFilterRequest'
import { BlockSchemaFilter } from '@/models/BlockSchemaFilter'
import { MapFunction } from '@/services/Mapper'

export const mapBlockSchemaFilterToBlockSchemaFilterRequest: MapFunction<BlockSchemaFilter, BlockSchemaFilterRequest> = function(source) {
  return {
    'offset': source.offset,
    'limit': source.limit,
    'block_schemas': source.blockSchemas ? { 'block_type_id': source.blockSchemas.blockTypeId } : undefined,
  }
}