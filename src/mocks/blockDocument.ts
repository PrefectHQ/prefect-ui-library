import { BlockDocument } from '@/models/BlockDocument'
import { MockFunction } from '@/services/Mocker'

export const randomBlockDocument: MockFunction<BlockDocument> = function(overrides: Partial<BlockDocument> = {}) {
  const blockType = this.create('blockType', [overrides.blockType])
  const blockSchema = this.create('blockSchema', [overrides.blockSchema])

  return new BlockDocument({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('noun'),
    data: {},
    blockSchemaId: blockSchema.id,
    blockSchema,
    blockTypeId: blockType.id,
    blockType,
    blockDocumentReferences: {},
    ...overrides,
  })
}