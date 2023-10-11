import { BlockDataType } from '@/mocks/blockDocumentData'
import { BlockDocument } from '@/models/BlockDocument'
import { createObjectLevelCan } from '@/models/ObjectLevelCan'
import { MockFunction } from '@/services/Mocker'

export const randomBlockDocument: MockFunction<BlockDocument, [Partial<BlockDocument>?]> = function(overrides = {}, type?: BlockDataType) {
  const blockType = this.create('blockType', [overrides.blockType])
  const blockSchema = this.create('blockSchema', [overrides.blockSchema])
  const data = this.create('blockDocumentData', [type])

  return new BlockDocument({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    isAnonymous: this.create('boolean'),
    name: this.create('noun'),
    data,
    blockSchemaId: blockSchema.id,
    blockSchema,
    blockTypeId: blockType.id,
    blockType,
    blockDocumentReferences: {},
    can: createObjectLevelCan(),
    ...overrides,
  })
}