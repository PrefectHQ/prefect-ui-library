import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentResponseToBlockDocument: MapFunction<BlockDocumentResponse, BlockDocument> = function(source: BlockDocumentResponse): BlockDocument {
  return new BlockDocument({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    data: source.data,
    blockSchemaId: source.block_schema_id,
    blockSchema: this.map('BlockSchemaResponse', source.block_schema, 'BlockSchema'),
    blockTypeId: source.block_type_id,
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
    blockDocumentReferences: source.block_document_references,
  })
}