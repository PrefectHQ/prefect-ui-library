import { BlockDocumentResponseData } from '@/models/api/BlockDocumentResponse'
import { BlockDocumentData } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'
import { isBlockDocumentResponseDataReference } from '@/utilities/blocks'

export const mapBlockDocumentResponseDataToBlockDocumentData: MapFunction<BlockDocumentResponseData, BlockDocumentData> = function(source: BlockDocumentResponseData): BlockDocumentData {
  const data: BlockDocumentData = {}

  Object.entries(source).forEach(([key, value]) => {
    if (isBlockDocumentResponseDataReference(value)) {
      data[key] = {
        $ref: {
          blockDocumentId: value.$ref.block_document_id,
        },
      }
    }

    data[key] = value
  })

  return data
}