import { AxiosError } from 'axios'
import { BlockSchema } from '@/models/BlockSchema'
import { BlockSchemasApi } from '@/services/BlockSchemasApi'
import { MockFunction } from '@/services/Mocker'
import { mockClass } from '@/utilities/mocks'

export const blockSchemasApiFactory: MockFunction<BlockSchemasApi, [Partial<BlockSchemasApi>?]> = function(overrides = {}) {
  const blockSchemas = this.createMany('blockSchema', this.create('number', [2, 20]))

  return mockClass(BlockSchemasApi, {
    getBlockSchemas: () => Promise.resolve(blockSchemas),

    getBlockSchema: (blockSchemaId: string) => {
      return new Promise<BlockSchema>((resolve, reject) => {
        const blockSchema = blockSchemas.find(blockSchema => blockSchema.id == blockSchemaId)

        if (blockSchema === undefined) {
          return reject(new AxiosError('Block schema not found', '404'))
        }

        resolve(blockSchema)
      })
    },

    ...overrides,
  })
}