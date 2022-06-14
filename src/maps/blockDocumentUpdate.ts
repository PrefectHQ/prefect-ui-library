/* eslint-disable camelcase */
import { BlockDocumentUpdateRequest } from '@/models/api/BlockDocumentUpdateRequest'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentUpdateToBlockDocumentUpdateRequest: MapFunction<BlockDocumentUpdate, BlockDocumentUpdateRequest> = function(source: BlockDocumentUpdate): BlockDocumentUpdateRequest {
  return {
    name: source.name,
    data: source.data,
  }
}