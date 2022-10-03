import { SelectOption } from '@prefecthq/prefect-design'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities/mapping'

export const mapBlockDocumentResponseToBlockDocument: MapFunction<BlockDocumentResponse, BlockDocument> = function(source: BlockDocumentResponse): BlockDocument {
  const blockSchema = this.map('BlockSchemaResponse', source.block_schema, 'BlockSchema')
  const data = this.map('SchemaValuesResponse', { values: source.data, references: source.block_document_references, schema: blockSchema.fields }, 'SchemaValues')

  return new BlockDocument({
    ...mapSnakeToCamelCase(source),
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    blockDocumentReferences: this.map('BlockDocumentReferencesResponse', source.block_document_references, 'BlockDocumentReferences'),
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
    blockSchema,
    data,
  })
}

export const mapBlockDocumentToSelectOption: MapFunction<BlockDocument, SelectOption> = function({ name, id }: BlockDocument): SelectOption {
  return {
    label: name,
    value: id,
  }
}