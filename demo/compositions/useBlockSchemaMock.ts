import { useBlockSchemaCapabilitiesMock } from './useBlockSchemaCapabilitiesMock'
import { useSeeds } from './useSeeds'
import { BlockSchema } from '@/models'
import { mocker } from '@/services'
import { repeat, some } from '@/utilities'

export function useBlockSchemaMock(override?: Partial<BlockSchema>): BlockSchema {
  const capabilities = useBlockSchemaCapabilitiesMock(3)
  const blockSchema = mocker.create('blockSchema', [
    {
      capabilities,
      ...override,
    },
  ])

  useSeeds({
    blockSchemas: [blockSchema],
  })

  return blockSchema
}

export function useBlockSchemasMock(count: number, override?: () => Partial<BlockSchema>): BlockSchema[] {
  const blockSchemaCapabilities = useBlockSchemaCapabilitiesMock(5)

  const blockSchemas = repeat(count, () => {
    const capabilities = some(blockSchemaCapabilities)

    return mocker.create('blockSchema', [
      {
        capabilities,
        ...override?.(),
      },
    ])
  })

  useSeeds({
    blockSchemaCapabilities,
    blockSchemas,
  })

  return blockSchemas
}