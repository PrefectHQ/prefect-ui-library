import { BlockType } from '@/models/BlockType'
import { MockFunction } from '@/services/Mocker'

export const randomBlockType: MockFunction<BlockType> = function(blockType: Partial<BlockType> = {}) {
  return new BlockType({
    id: blockType.id ?? this.create('string'),
    created: blockType.created ?? this.create('date'),
    updated: blockType.updated ?? this.create('date'),
    name: blockType.name ?? this.create('string'),
    logoUrl: blockType.logoUrl ?? this.create('image'),
    documentationUrl: blockType.documentationUrl ?? 'orion-docs.prefect.io',
  })
}