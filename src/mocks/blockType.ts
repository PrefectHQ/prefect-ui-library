import { BlockType } from '@/models/BlockType'
import { MockFunction } from '@/services/Mocker'

export const randomBlockType: MockFunction<BlockType, [Partial<BlockType>?]> = function(overrides = {}) {
  return new BlockType({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('noun'),
    logoUrl: this.create('image'),
    documentationUrl: 'orion-docs.prefect.io',
    description: this.create('sentence'),
    codeExample: this.create('sentence'),
    ...overrides,
  })
}