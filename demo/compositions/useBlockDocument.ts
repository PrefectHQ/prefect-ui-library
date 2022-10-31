import { useSeeds } from './useSeeds'
import { BlockDocument } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'

export function useBlockDocumentMock(override?: Partial<BlockDocument>): BlockDocument {
  const blockDocument = mocker.create('blockDocument', [override])

  useSeeds({
    blockDocuments: [blockDocument],
  })

  return blockDocument
}

export function useBlockDocumentsMock(count: number, override?: Partial<BlockDocument>): BlockDocument[] {
  return repeat(count, () => useBlockDocumentMock(override))
}