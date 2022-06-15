import { AxiosError } from 'axios'
import { BlockDocument, BlockDocumentCreate, BlockDocumentUpdate } from '@/models'
import { BlockDocumentsApi } from '@/services'
import { MockFunction } from '@/services/Mocker'
import { mockClass } from '@/utilities/mocks'

export const blockDocumentsApiMockFactory: MockFunction<BlockDocumentsApi> = function(overrides: Partial<BlockDocumentsApi> = {}) {
  const blockDocuments = this.createMany('blockDocument', this.create('number', [2, 20]))

  return mockClass(BlockDocumentsApi, {
    getBlockDocuments: () => Promise.resolve(blockDocuments),

    getBlockDocument: (blockDocumentId: string) => {
      return new Promise<BlockDocument>((resolve, reject) => {
        const blockDocument = blockDocuments.find(blockDocument => blockDocument.id == blockDocumentId)

        if (blockDocument === undefined) {
          return reject(new AxiosError('Block document not found', '404'))
        }

        resolve(blockDocument)
      })
    },

    createBlockDocument: (request: BlockDocumentCreate) => {
      const blockDocument = this.create('blockDocument', [request])
      blockDocuments.push(blockDocument)

      return Promise.resolve(blockDocument)
    },

    updateBlockDocument: (blockDocumentId: string, request: BlockDocumentUpdate) => {
      return new Promise<BlockDocument>((resolve, reject) => {
        const blockDocument = blockDocuments.find(blockDocument => blockDocument.id == blockDocumentId)

        if (blockDocument === undefined) {
          return reject(new AxiosError('Block document not found', '404'))
        }

        Object.assign(blockDocument, request)

        resolve(blockDocument)
      })
    },

    ...overrides,
  })
}