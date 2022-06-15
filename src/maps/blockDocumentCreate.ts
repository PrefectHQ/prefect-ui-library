import { BlockDocumentCreateRequest } from '@/models/api/BlockDocumentCreateRequest'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'

export const mapBlockDocumentCreateToBlockDocumentCreateRequest: MapFunction<BlockDocumentCreate, BlockDocumentCreateRequest> = function(source: BlockDocumentCreate): BlockDocumentCreateRequest {
  return mapCamelToSnakeCase(source)
}