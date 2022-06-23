import { BlockDocumentResponseData, BlockDocumentResponseReferences } from '@/models/api/BlockDocumentResponse'
import { BlockDocumentData } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'

type BlockDocumentResponseDataWithReferences = {
  data: BlockDocumentResponseData,
  references: BlockDocumentResponseReferences,
}

export const mapBlockDocumentResponseDataToBlockDocumentData: MapFunction<BlockDocumentResponseDataWithReferences, BlockDocumentData> = function(source: BlockDocumentResponseDataWithReferences): BlockDocumentData {
  const data: BlockDocumentData = {}

  Object.entries(source.data).forEach(([key, value]) => {
    console.log({ key, value }, source.references)
    if (key in source.references) {
      data[key] = {
        $ref: {
          blockDocumentId: source.references[key].block_document.id,
        },
      }
    } else {
      data[key] = value
    }
  })

  return data
}