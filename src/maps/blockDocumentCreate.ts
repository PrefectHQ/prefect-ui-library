import { BlockDocumentCreateRequest, BlockDocumentRequestData } from '@/models/api/BlockDocumentCreateRequest'
import { BlockDocumentData } from '@/models/BlockDocument'
import { BlockDocumentCreate } from '@/models/BlockDocumentCreate'
import { MapFunction } from '@/services/Mapper'
import { mapCamelToSnakeCase } from '@/utilities'
import { isBlockDocumentDataReference } from '@/utilities/blocks'

export const mapBlockDocumentDataToBlockDocumentRequestData: MapFunction<BlockDocumentData, BlockDocumentRequestData> = function(source: BlockDocumentData): BlockDocumentRequestData {
  const data: BlockDocumentRequestData = {}

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
    data: this.map('BlockDocumentData', source.data, 'BlockDocumentRequestData'),
  }
}