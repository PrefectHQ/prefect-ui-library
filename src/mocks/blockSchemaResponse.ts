/* eslint-disable camelcase */
import { BlockSchemaResponse } from '@/models/api/BlockSchemaResponse'
import { MockFunction } from '@/services/Mocker'

export const randomBlockSchemaResponse: MockFunction<BlockSchemaResponse, [Partial<BlockSchemaResponse>?]> = function(overrides = {}) {
  const block_type = this.create('blockTypeResponse', [overrides.block_type])

  return {
    id: this.create('string'),
    created: this.create('date').toISOString(),
    updated: this.create('date').toISOString(),
    checksum: this.create('string'),
    fields: this.create('schema'),
    block_type_id: block_type.id,
    block_type,
    capabilities: this.create('blockSchemaCapabilities'),
    ...overrides,
  }
}