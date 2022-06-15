import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { BlockSchema } from '@/models/BlockSchema'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities/mapping'

export const mapBlockSchemaResponseToBlockSchema: MapFunction<BlockSchemaResponse, BlockSchema> = function(source: BlockSchemaResponse): BlockSchema {
  return new BlockSchema({
    ...mapSnakeToCamelCase(source),
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    fields: this.map('BlockSchemaFieldsResponse', source.fields, 'BlockSchemaFields'),
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
  })
}