import { BlockSchema } from '@/models/BlockSchema'
import { MockFunction } from '@/services/Mocker'

export const randomBlockSchema: MockFunction<BlockSchema> = function(overrides: Partial<BlockSchema> = {}) {
  return new BlockSchema({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    checksum: this.create('string'),
    fields: this.create('blockSchemaFields'),
    blockTypeId: this.create('string'),
    blockType: this.create('blockType'),
    capabilities: this.create('blockSchemaCapabilities'),
    ...overrides,
  })
}