import { AxiosError } from 'axios'
import { BlockDocument, BlockDocumentCreate, BlockDocumentUpdate } from '@/models'
import { BlockDocumentsApi } from '@/services'
import { MockFunction } from '@/services/Mocker'
import { mockClass } from '@/utilities/mocks'

type BlockDocumentApiFactoryParameters = {
  overrides?: Partial<BlockDocumentsApi>,
  blockDocuments?: BlockDocument[],
}

export const blockDocumentsApiMockFactory: MockFunction<BlockDocumentsApi, [Partial<BlockDocumentApiFactoryParameters>?]> = function({ blockDocuments, overrides } = {}) {
  const documents = blockDocuments ?? this.createMany('blockDocument', this.create('number', [2, 20]))

  return mockClass(BlockDocumentsApi, {
    getBlockDocuments: () => Promise.resolve(documents),

    getBlockDocument: (blockDocumentId: string) => {
      return new Promise<BlockDocument>((resolve, reject) => {
        const blockDocument = documents.find(blockDocument => blockDocument.id == blockDocumentId)

        if (blockDocument === undefined) {
          return reject(new AxiosError('Block document not found', '404'))
        }

        resolve(blockDocument)
      })
    },

    createBlockDocument: (request: BlockDocumentCreate) => {
      const blockDocument = this.create('blockDocument', [request])
      documents.push(blockDocument)

      return Promise.resolve(blockDocument)
    },

    updateBlockDocument: (blockDocumentId: string, request: BlockDocumentUpdate) => {
      return new Promise<void>((resolve, reject) => {
        const blockDocument = documents.find(blockDocument => blockDocument.id == blockDocumentId)

        if (blockDocument === undefined) {
          return reject(new AxiosError('Block document not found', '404'))
        }

        Object.assign(blockDocument, request)

        resolve()
      })
    },

    deleteBlockDocument: (blockDocumentId: string) => {
      return new Promise<void>((resolve, reject) => {
        const index = documents.findIndex(blockDocument => blockDocument.id === blockDocumentId)

        if (index < 0) {
          return reject(new AxiosError('Block document not found', '404'))
        }

        documents.splice(index, 1)

        resolve()
      })
    },

    ...overrides,
  })
}