import { BlockDocumentCreateRequest } from '@/models/api/BlockDocumentCreateRequest'
import { BlockDocumentCreate, isBlockDocumentCreateNamed } from '@/models/BlockDocumentCreate'
import { MapFunction } from '@/services/Mapper'


export const mapBlockDocumentCreateToBlockDocumentCreateRequest: MapFunction<BlockDocumentCreate, BlockDocumentCreateRequest> = function(source) {
  const { blockSchema, data: values } = source
  const schema = blockSchema.fields
  const data = this.map('SchemaValues', { values, schema }, 'SchemaValuesRequest')

  if (isBlockDocumentCreateNamed(source)) {
    return {
      name: source.name,
      block_schema_id: blockSchema.id,
      block_type_id: blockSchema.blockTypeId,
      data,
    }
  }

  return {
    is_anonymous: source.isAnonymous,
    block_schema_id: blockSchema.id,
    block_type_id: blockSchema.blockTypeId,
    data,
  }
}