import { BlockDocumentUpdateRequest } from '@/models/api/BlockDocumentUpdateRequest'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapBlockDocumentUpdateToBlockDocumentUpdateRequest: MapFunction<BlockDocumentUpdate, BlockDocumentUpdateRequest> = function(source: BlockDocumentUpdate): BlockDocumentUpdateRequest {
  return mapCamelToSnakeCase(source)
}