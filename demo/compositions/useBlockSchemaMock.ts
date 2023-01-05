import { useBlockSchemaCapabilitiesMock } from './useBlockSchemaCapabilitiesMock'
import { useSeeds } from './useSeeds'
import { BlockSchema } from '@/models'
import { mocker } from '@/services'
import { choice, repeat, some } from '@/utilities'

export function useBlockSchemaMock(override?: Partial<BlockSchema>): BlockSchema {
  const capabilities = useBlockSchemaCapabilitiesMock(3)
  const blockType = mocker.create('blockType')
  const blockSchema = mocker.create('blockSchema', [
    {
      capabilities,
      blockType,
      blockTypeId: blockType.id,
      ...override,
    },
  ])

  const blockDocuments = mocker.createMany('blockDocument', 3, [
    {
      blockSchema,
      blockSchemaId: blockSchema.id,
      blockType,
      blockTypeId: blockType.id,
    },
  ])

  useSeeds({
    blockSchemas: [blockSchema],
    blockTypes: [blockType],
    blockDocuments,
  })

  return blockSchema
}

export function useBlockSchemasMock(count: number, override?: () => Partial<BlockSchema>): BlockSchema[] {
  const blockSchemaCapabilities = useBlockSchemaCapabilitiesMock(5)
  const blockTypes = mocker.createMany('blockType', count)

  const blockSchemas = repeat(count, () => {
    const capabilities = some(blockSchemaCapabilities)
    const blockType = blockTypes.pop()

    return mocker.create('blockSchema', [
      {
        capabilities,
        blockType,
        blockTypeId: blockType?.id,
        ...override?.(),
      },
    ])
  })

  const blockDocuments = repeat(count * 2, () => {
    const blockSchema = choice(blockSchemas)

    return mocker.create('blockDocument', [
      {
        blockSchema,
        blockSchemaId: blockSchema.id,
        blockType: blockSchema.blockType,
        blockTypeId: blockSchema.blockTypeId,
      },
    ])
  })

  useSeeds({
    blockSchemaCapabilities,
    blockSchemas,
    blockTypes,
    blockDocuments,
  })

  return blockSchemas
}