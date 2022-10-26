/* eslint-disable camelcase */
import { BlockDataType } from './blockDocumentData'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { MockFunction } from '@/services/Mocker'

export const randomBlockDocumentResponse: MockFunction<BlockDocumentResponse, [Partial<BlockDocumentResponse>?]> = function(overrides = {}, type?: BlockDataType) {
  const block_type = this.create('blockTypeResponse', [overrides.block_type])
  const block_schema = this.create('blockSchemaResponse', [overrides.block_schema])
  const data = this.create('blockDocumentData', [type])

  return {
    id: this.create('id'),
    created: this.create('date').toISOString(),
    updated: this.create('date').toISOString(),
    name: this.create('noun'),
    data,
    block_schema_id: block_schema.id,
    block_schema,
    block_type_id: block_type.id,
    block_type,
    block_document_references: {},
    ...overrides,
  }
}