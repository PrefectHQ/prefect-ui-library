import { SelectOption } from '@prefecthq/prefect-design'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'

export const mapBlockDocumentResponseToBlockDocument: MapFunction<BlockDocumentResponse, BlockDocument> = function(source) {
  const blockSchema = this.map('BlockSchemaResponse', source.block_schema, 'BlockSchema')

  return new BlockDocument({
    id: source.id,
    name: source.name,
    isAnonymous: source.is_anonymous,
    blockSchemaId: source.block_schema_id,
    blockTypeId: source.block_type_id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    blockDocumentReferences: this.map('BlockDocumentReferencesResponse', source.block_document_references, 'BlockDocumentReferences'),
    blockType: this.map('BlockTypeResponse', source.block_type, 'BlockType'),
    blockSchema,
    data: this.map('SchemaValuesResponse', { values: source.data, references: source.block_document_references, schema: blockSchema.fields }, 'SchemaValues'),
  })
}

export const mapBlockDocumentToSelectOption: MapFunction<BlockDocument, SelectOption> = function({ name, id }) {
  return {
    label: name,
    value: id,
  }
}