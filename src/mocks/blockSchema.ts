import { BlockSchema } from '@/models/BlockSchema'
import { MockFunction } from '@/services/Mocker'

export const randomBlockSchema: MockFunction<BlockSchema> = function(blockSchema: Partial<BlockSchema> = {}) {
  return new BlockSchema({
    id: blockSchema.id ?? this.create('string'),
    created: blockSchema.created ?? this.create('date'),
    updated: blockSchema.updated ?? this.create('date'),
    checksum: blockSchema.checksum ?? this.create('string'),
    fields: blockSchema.fields ?? this.create('blockSchemaFields'),
    blockTypeId: blockSchema.blockTypeId ?? this.create('string'),
    blockType: blockSchema.blockType ?? this.create('blockType'),
    capabilities: blockSchema.capabilities ?? [],
  })
}