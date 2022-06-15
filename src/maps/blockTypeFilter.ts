import { BlockTypeFilterRequest } from '@/models/api/BlockTypeFilterRequest'
import { BlockTypeFilter } from '@/models/BlockTypeFilter'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapBlockTypeFilterToBlockTypeRequest: MapFunction<BlockTypeFilter, BlockTypeFilterRequest> = function(source: BlockTypeFilter): BlockTypeFilterRequest {
  return mapCamelToSnakeCase(source)
}