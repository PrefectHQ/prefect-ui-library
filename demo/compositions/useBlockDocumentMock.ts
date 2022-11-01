import { useBlockSchemaCapabilitiesMock } from './useBlockSchemaCapabilitiesMock'
import { useBlockSchemaMock, useBlockSchemasMock } from './useBlockSchemaMock'
import { useBlockTypeMock, useBlockTypesMock } from './useBlockTypeMock'
import { useSeeds } from './useSeeds'
import { BlockDocument } from '@/models'
import { mocker } from '@/services'
import { choice, repeat, some } from '@/utilities'

export function useBlockDocumentMock(override?: Partial<BlockDocument>): BlockDocument {
  const blockType = useBlockTypeMock()
  const blockSchema = useBlockSchemaMock({
    blockType,
    blockTypeId: blockType.id,
  })
  const blockDocument = mocker.create('blockDocument', [
    {
      blockType,
      blockTypeId: blockType.id,
      blockSchema,
      blockSchemaId: blockSchema.id,
      ...override,
    },
  ])

  useSeeds({
    blockDocuments: [blockDocument],
  })

  return blockDocument
}

export function useBlockDocumentsMock(count: number, override?: () => Partial<BlockDocument>): BlockDocument[] {
  const blockTypes = useBlockTypesMock(3)

  const blockSchemaCapabilities = useBlockSchemaCapabilitiesMock(5)
  const blockSchemas = useBlockSchemasMock(3, () => {
    const capabilities = some(blockSchemaCapabilities)
    const blockType = choice(blockTypes)

    return {
      capabilities,
      blockType,
      blockTypeId: blockType.id,
    }
  })

  const blockDocuments = repeat(count, () => {
    const blockSchema = choice(blockSchemas)
    const { blockType } = blockSchema

    return mocker.create('blockDocument', [
      {
        blockType,
        blockTypeId: blockType.id,
        blockSchema,
        blockSchemaId: blockSchema.id,
        ...override?.(),
      },
    ])
  })

  useSeeds({
    blockDocuments,
  })

  return blockDocuments
}