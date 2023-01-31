import { BlockDocumentReferencesResponse, BlockDocumentReferences, BlockDocumentReference } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentResponseReferencesToBlockDocumentReferences: MapFunction<BlockDocumentReferencesResponse, BlockDocumentReferences> = function(source) {
  const result: BlockDocumentReferences = {}

  return Object.keys(source).reduce((result, key) => {
    const { block_document } = source[key]!
    const { block_type } = block_document

    const reference: BlockDocumentReference = {
      id: block_document.id,
      isAnonymous: block_document.is_anonymous,
      name: block_document.name,
      blockType: this.map('BlockTypeResponse', block_type, 'BlockType'),
    }

    result[key] = reference

    return result
  }, result)
}
