/* eslint-disable camelcase */
import { BlockSchemaFilterRequest } from '@/models/api/BlockSchemaFilterRequest'
import { BlockSchemaFilter } from '@/models/BlockSchemaFilter'
import { MapFunction } from '@/services/Mapper'

export const mapBlockSchemaFilterToBlockSchemaFilterRequest: MapFunction<BlockSchemaFilter, BlockSchemaFilterRequest> = function(source: BlockSchemaFilter): BlockSchemaFilterRequest {
  return {
    limit: source.limit,
    offset: source.offset,
  }
}