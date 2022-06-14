import { BlockDocumentCreate, BlockDocumentUpdate } from '@/models'
import { BlockDocumentsApi } from '@/services'
import { MockFunction } from '@/services/Mocker'

type MockedObject<T extends object> = Record<keyof T, T[keyof T]>

function hasProperty<T extends Record<string | symbol, unknown>>(needle: T, property: unknown): property is keyof T {
  return typeof property === 'string' || typeof property === 'symbol' && property in needle
}

function mockedClass<T extends object>(constructor: new () => T, mocked: MockedObject<T>): T {
  return new Proxy(new constructor(), {
    get: (target, prop) => {
      if (hasProperty(mocked, prop)) {
        return mocked[prop]
      }
    },
  })
}

export const blockDocumentsApiMockFactory: MockFunction<BlockDocumentsApi> = function(overrides: Partial<BlockDocumentsApi> = {}) {
  return mockedClass(BlockDocumentsApi, {
    getBlockDocuments: () => Promise.resolve(this.createMany('blockDocument', 4)),
    getBlockDocument: () => Promise.resolve(this.create('blockDocument')),
    createBlockDocument: (request: BlockDocumentCreate) => Promise.resolve(this.create('blockDocument', [request])),
    updateBlockDocument: (blockDocumentId: string, request: BlockDocumentUpdate) => Promise.resolve(this.create('blockDocument', [request])),
    deleteBlockDocument: () => Promise.resolve(),
    ...overrides,
  })
}