import { SelectOption } from '@prefecthq/prefect-design'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { MapFunction } from '@/services/Mapper'
import { resolveSchemaBlockDocumentReferences } from '@/services/schemas/SchemaBlockReferenceResolver'
import { SchemaValuesMapper } from '@/services/schemas/SchemaValues'
import { mapSnakeToCamelCase } from '@/utilities/mapping'

export const mapBlockDocumentResponseToBlockDocument: MapFunction<BlockDocumentResponse, BlockDocument> = function(source: BlockDocumentResponse): BlockDocument {
  const values = resolveSchemaBlockDocumentReferences(source.data, source.block_document_references)
  const blockSchema = this.map('BlockSchemaResponse', source.block_schema, 'BlockSchema')
  const mapper = new SchemaValuesMapper({ schema: blockSchema.fields, mapper: this })
  const data = mapper.mapResponse(values)

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