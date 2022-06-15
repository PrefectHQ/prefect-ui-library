import { BlockTypeFilterRequest } from '@/models/api/BlockTypeFilterRequest'
import { BlockTypeFilter } from '@/models/BlockTypeFilter'
import { MapFunction } from '@/services/Mapper'

export const mapBlockTypeFilterToBlockTypeRequest: MapFunction<BlockTypeFilter, BlockTypeFilterRequest> = function(source: BlockTypeFilter): BlockTypeFilterRequest {
  return {
    limit: source.limit,
    offset: source.offset,
  }
}