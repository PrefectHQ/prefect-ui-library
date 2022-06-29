import { AxiosError } from 'axios'
import { BlockSchema } from '@/models/BlockSchema'
import { BlockSchemasApi } from '@/services/BlockSchemasApi'
import { MockFunction } from '@/services/Mocker'
import { mockClass } from '@/utilities/mocks'

type BlockSchemaApiFactoryParameters = {
  overrides?: Partial<BlockSchemasApi>,
  blockSchemas?: BlockSchema[],
}

export const blockSchemasApiFactory: MockFunction<BlockSchemasApi, [Partial<BlockSchemaApiFactoryParameters>?]> = function({ blockSchemas, overrides } = {}) {
  const schemas = blockSchemas ?? this.createMany('blockSchema', this.create('number', [2, 20]))

  return mockClass(BlockSchemasApi, {
    getBlockSchemas: () => Promise.resolve(schemas),

    getBlockSchema: (blockSchemaId: string) => {
      return new Promise<BlockSchema>((resolve, reject) => {
        const blockSchema = schemas.find(blockSchema => blockSchema.id == blockSchemaId)

        if (blockSchema === undefined) {
          return reject(new AxiosError('Block schema not found', '404'))
        }

        resolve(blockSchema)
      })
    },

    ...overrides,
  })
}