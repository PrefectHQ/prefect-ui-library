import { SelectOption } from '@prefecthq/prefect-design'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities/mapping'

export const mapBlockDocumentResponseToBlockDocument: MapFunction<BlockDocumentResponse, BlockDocument> = function(source: BlockDocumentResponse): BlockDocument {
  return new BlockDocument({
    ...mapSnakeToCamelCase(source),
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    blockSchema: this.map('BlockSchemaResponse', source.block_schema, 'BlockSchema'),
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
    data: this.map('SchemaValuesResponse', { values: source.data, schema: source.block_schema.fields }, 'SchemaValues'),
  })
}


export const mapBlockDocumentToSelectOption: MapFunction<BlockDocument, SelectOption> = function({ name, id }: BlockDocument): SelectOption {
  return {
    label: name,
    value: id,
  }
}