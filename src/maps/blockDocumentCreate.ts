/* eslint-disable camelcase */
import { BlockDocumentCreateRequest } from '@/models/api/BlockDocumentCreateRequest'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentCreateToBlockDocumentCreateRequest: MapFunction<BlockDocumentCreate, BlockDocumentCreateRequest> = function(source: BlockDocumentCreate): BlockDocumentCreateRequest {
  return {
    name: source.name,
    data: source.data,
    block_schema_id: source.blockSchemaId,
    block_type_id: source.blockTypeId,
  }
}