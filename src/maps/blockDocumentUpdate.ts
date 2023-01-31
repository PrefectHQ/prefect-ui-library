import { BlockDocumentUpdateRequest } from '@/models/api/BlockDocumentUpdateRequest'
import { BlockDocumentUpdate } from '@/models/BlockDocumentUpdate'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentUpdateToBlockDocumentUpdateRequest: MapFunction<BlockDocumentUpdate, BlockDocumentUpdateRequest> = function(source) {
  const { blockSchema, data: values, mergeExistingData } = source
  const schema = blockSchema.fields
  const data = this.map('SchemaValues', { values, schema }, 'SchemaValuesRequest')

  return {
    data,
    merge_existing_data: mergeExistingData,
  }
}