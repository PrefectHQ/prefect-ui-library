import { BlockSchemaFields } from '@/models/BlockSchema'
import { MockFunction } from '@/services/Mocker'

export const randomBlockSchemaFields: MockFunction<BlockSchemaFields, [Partial<BlockSchemaFields>?]> = function(blockSchemaFields = {}) {
  return {
    title: blockSchemaFields.title ?? this.create('string'),
    description: blockSchemaFields.description ?? this.create('sentence'),
    type: blockSchemaFields.type ?? 'object',
    properties: blockSchemaFields.properties ?? {},
    required: blockSchemaFields.required ?? [],
    blockTypeName: blockSchemaFields.blockTypeName ?? this.create('string'),
    blockSchemaReferences: blockSchemaFields.blockSchemaReferences ?? {},
  }
}