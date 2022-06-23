import { BlockDocumentCreateRequest, BlockDocumentCreateRequestData } from '@/models/api/BlockDocumentCreateRequest'
import { BlockDocumentData } from '@/models/BlockDocument'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'
import { isBlockDocumentDataReference } from '@/utilities/blocks'

export const mapBlockDocumentDataToBlockDocumentCreateRequestData: MapFunction<BlockDocumentData, BlockDocumentCreateRequestData> = function(source: BlockDocumentData): BlockDocumentCreateRequestData {
  const data: BlockDocumentCreateRequestData = {}

  Object.entries(source).forEach(([key, value]) => {
    if (isBlockDocumentDataReference(value)) {
      data[key] = {
        $ref: {
          // eslint-disable-next-line camelcase
          block_document_id: value.$ref.blockDocumentId,
        },
      }
    } else {
      data[key] = value
    }
  })

  return data
}

export const mapBlockDocumentCreateToBlockDocumentCreateRequest: MapFunction<BlockDocumentCreate, BlockDocumentCreateRequest> = function(source: BlockDocumentCreate): BlockDocumentCreateRequest {
  return {
    ...mapCamelToSnakeCase(source),
    data: this.map('BlockDocumentData', source.data, 'BlockDocumentCreateRequestData'),
  }
}