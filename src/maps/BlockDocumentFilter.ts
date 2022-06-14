/* eslint-disable camelcase */
import { BlockDocumentFilterRequest } from '@/models/api/BlockDocumentFilterRequest'
import { BlockDocumentFilter } from '@/models/BlockDocumentFilter'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentFilterToBlockDocumentRequest: MapFunction<BlockDocumentFilter, BlockDocumentFilterRequest> = function(source: BlockDocumentFilter): BlockDocumentFilterRequest {
  return {
    block_schema_type: source.blockSchemaType,
    limit: source.limit,
    offset: source.offset,
  }
}