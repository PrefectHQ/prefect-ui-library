import { BlockDocumentCreate, BlockDocumentUpdate } from '@/models'
import { BlockDocumentsApi } from '@/services'
import { MockFunction } from '@/services/Mocker'
import { mockClass } from '@/utilities/mocks'

export const blockDocumentsApiMockFactory: MockFunction<BlockDocumentsApi> = function(overrides: Partial<BlockDocumentsApi> = {}) {
  return mockClass(BlockDocumentsApi, {
    getBlockDocuments: () => Promise.resolve(this.createMany('blockDocument', this.create('number', [2, 20]))),
    getBlockDocument: () => Promise.resolve(this.create('blockDocument')),
    createBlockDocument: (request: BlockDocumentCreate) => Promise.resolve(this.create('blockDocument', [request])),
    updateBlockDocument: (blockDocumentId: string, request: BlockDocumentUpdate) => Promise.resolve(this.create('blockDocument', [request])),
    ...overrides,
  })
}