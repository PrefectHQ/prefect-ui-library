import { BlockDocumentFilterRequest } from '@/models/api/BlockDocumentFilterRequest'
import { BlockDocumentFilter } from '@/models/BlockDocumentFilter'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapBlockDocumentFilterToBlockDocumentFilterRequest: MapFunction<BlockDocumentFilter, BlockDocumentFilterRequest> = function(source: BlockDocumentFilter): BlockDocumentFilterRequest {
  return mapCamelToSnakeCase(source)
}