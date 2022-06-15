import { BlockSchemaFilterRequest } from '@/models/api/BlockSchemaFilterRequest'
import { BlockSchemaFilter } from '@/models/BlockSchemaFilter'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities/mapping'

export const mapBlockSchemaFilterToBlockSchemaFilterRequest: MapFunction<BlockSchemaFilter, BlockSchemaFilterRequest> = function(source: BlockSchemaFilter): BlockSchemaFilterRequest {
  return mapCamelToSnakeCase(source)
}