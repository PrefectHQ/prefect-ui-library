import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities/mapping'

export const mapBlockDocumentResponseToBlockDocument: MapFunction<BlockDocumentResponse, BlockDocument> = function(source: BlockDocumentResponse): BlockDocument {
  return new BlockDocument({
    ...mapSnakeToCamelCase(source),
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    blockSchema: this.map('BlockSchemaResponse', source.block_schema, 'BlockSchema'),
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
    data: this.map('BlockDocumentResponseDataWithReferences', { data: source.data, references: source.block_document_references }, 'BlockDocumentData'),
  })
}