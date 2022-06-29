/* eslint-disable camelcase */
import { BlockTypeFilterRequest } from '@/models/api/BlockTypeFilterRequest'
import { BlockTypeFilter } from '@/models/BlockTypeFilter'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapBlockTypeFilterToBlockTypeFilterRequest: MapFunction<BlockTypeFilter, BlockTypeFilterRequest> = function(source: BlockTypeFilter): BlockTypeFilterRequest {
  const filter: BlockTypeFilterRequest = mapCamelToSnakeCase(source)

  if (source.blockSchemas) {
    filter.block_schemas = {}

    if (source.blockSchemas.blockCapabilities) {
      filter.block_schemas.block_capabilities = {}

      if (source.blockSchemas.blockCapabilities.all_) {
        filter.block_schemas.block_capabilities.all_ = source.blockSchemas.blockCapabilities.all_
      }
    }
  }


  return filter
}