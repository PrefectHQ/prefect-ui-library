import { useSeeds } from './useSeeds'
import { BlockSchema } from '@/models'
import { mocker } from '@/services'
import { repeat } from '@/utilities'

export function useBlockSchemaMock(override?: Partial<BlockSchema>): BlockSchema {
  const blockSchema = mocker.create('blockSchema', [override])

  useSeeds({
    blockSchemas: [blockSchema],
  })

  return blockSchema
}

export function useBlockSchemasMock(count: number, override?: () => Partial<BlockSchema>): BlockSchema[] {
  return repeat(count, () => useBlockSchemaMock(override?.()))
}