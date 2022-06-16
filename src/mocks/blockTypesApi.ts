import { AxiosError } from 'axios'
import { BlockType } from '@/models/BlockType'
import { BlockTypesApi } from '@/services/BlockTypesApi'
import { MockFunction } from '@/services/Mocker'
import { mockClass } from '@/utilities/mocks'

export const blockTypesApiFactory: MockFunction<BlockTypesApi> = function(overrides: Partial<BlockTypesApi> = {}) {
  const blockTypes = this.createMany('blockType', this.create('number', [2, 20]))

  return mockClass(BlockTypesApi, {
    getBlockTypes: () => Promise.resolve(blockTypes),

    getBlockType: (blockTypeId: string) => {
      return new Promise<BlockType>((resolve, reject) => {
        const blockType = blockTypes.find(blockType => blockType.id == blockTypeId)

        if (blockType === undefined) {
          return reject(new AxiosError('Block type not found', '404'))
        }

        resolve(blockType)
      })
    },

    ...overrides,
  })
}