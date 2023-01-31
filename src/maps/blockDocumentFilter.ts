import { BlockDocumentFilterRequest } from '@/models/api/BlockDocumentFilterRequest'
import { BlockDocumentFilter } from '@/models/BlockDocumentFilter'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentFilterToBlockDocumentFilterRequest: MapFunction<BlockDocumentFilter, BlockDocumentFilterRequest> = function(source) {
  return {
    limit: source.limit,
    offset: source.offset,
    block_types: {
      name: {
        like_: source.blockTypes?.name,
      },
      slug: {
        any_: source.blockTypes?.slug,
      },
    },
  }
}