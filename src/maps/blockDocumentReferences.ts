/* eslint-disable camelcase */
import { BlockDocumentReferencesResponse, BlockDocumentReferences, BlockDocumentReference } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities'

export const mapBlockDocumentResponseReferencesToBlockDocumentReferences: MapFunction<BlockDocumentReferencesResponse, BlockDocumentReferences> = function(source: BlockDocumentReferencesResponse): BlockDocumentReferences {
  const result: BlockDocumentReferences = {}

  return Object.keys(source).reduce((result, key) => {
    const { block_document } = source[key]!
    const { block_type } = block_document

    const reference: BlockDocumentReference = {
      ...mapSnakeToCamelCase(block_document),
      blockType: this.map('BlockTypeResponse', block_type, 'BlockType'),
    }

    result[key] = reference

    return result
  }, result)
}
