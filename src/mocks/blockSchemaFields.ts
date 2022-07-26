import { BlockSchemaFields } from '@/models/BlockSchema'
import { MockFunction } from '@/services/Mocker'

export const randomBlockSchemaFields: MockFunction<BlockSchemaFields, [Partial<BlockSchemaFields>?]> = function(blockSchemaFields = {}) {
  return {
    title: blockSchemaFields.title ?? this.create('string'),
    description: blockSchemaFields.description ?? this.create('sentence'),
    type: blockSchemaFields.type ?? 'object',
    properties: blockSchemaFields.properties ?? {
      'url': {
        'title': 'Webhook URL',
        'minLength': 1,
        'maxLength': 2083,
        'format': 'uri',
        'type': 'string',
        'description': '',
      },
    },
    required: blockSchemaFields.required ?? [],
    blockTypeSlug: blockSchemaFields.blockTypeSlug ?? this.create('noun'),
    blockSchemaReferences: blockSchemaFields.blockSchemaReferences ?? {},
  }
}