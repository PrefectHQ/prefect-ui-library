import { BlockDocument } from '@/models/BlockDocument'
import { MockFunction } from '@/services/Mocker'

export const randomBlockDocument: MockFunction<BlockDocument> = function(overrides: Partial<BlockDocument> = {}) {
  return new BlockDocument({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('string'),
    data: {},
    blockSchemaId: this.create('string'),
    blockSchema: this.create('blockSchema'),
    blockTypeId: this.create('string'),
    blockType: this.create('blockType'),
    blockDocumentReferences: {},
    ...overrides,
  })
}