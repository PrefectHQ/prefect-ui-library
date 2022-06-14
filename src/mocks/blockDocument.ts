import { BlockDocument } from '@/models/BlockDocument'
import { MockFunction } from '@/services/Mocker'

export const randomBlockDocument: MockFunction<BlockDocument> = function(blockDocument: Partial<BlockDocument> = {}) {
  return new BlockDocument({
    id: blockDocument.id ?? this.create('string'),
    created: blockDocument.created ?? this.create('date'),
    updated: blockDocument.updated ?? this.create('date'),
    name: blockDocument.name ?? this.create('string'),
    data: blockDocument.data ?? {},
    blockSchemaId: blockDocument.blockSchemaId ?? this.create('string'),
    blockSchema: blockDocument.blockSchema ?? this.create('blockSchema'),
    blockTypeId: blockDocument.blockTypeId ?? this.create('string'),
    blockType: blockDocument.blockType ?? this.create('blockType'),
    blockDocumentReferences: blockDocument.blockDocumentReferences ?? {},
  })
}