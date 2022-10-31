import { useSeeds } from './useSeeds'
import { BlockType } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'

export function useBlockTypeMock(override?: Partial<BlockType>): BlockType {
  const blockType = mocker.create('blockType', [override])

  useSeeds({
    blockTypes: [blockType],
  })

  return blockType
}

export function useBlockTypesMock(count: number, override?: () => Partial<BlockType>): BlockType[] {
  return repeat(count, () => useBlockTypeMock(override?.()))
}