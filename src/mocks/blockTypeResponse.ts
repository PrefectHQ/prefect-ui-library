/* eslint-disable camelcase */
import { BlockTypeResponse } from '@/models/api/BlockTypeResponse'
import { MockFunction } from '@/services/Mocker'

export const randomBlockTypeResponse: MockFunction<BlockTypeResponse, [Partial<BlockTypeResponse>?]> = function(overrides = {}) {
  const nameAndSlug = this.create('noun')

  return {
    id: this.create('string'),
    created: this.create('date').toISOString(),
    updated: this.create('date').toISOString(),
    slug: nameAndSlug,
    name: nameAndSlug,
    logo_url: this.create('image'),
    documentation_url: 'orion-docs.prefect.io',
    description: this.create('sentence'),
    code_example: this.create('sentence'),
    ...overrides,
  }
}