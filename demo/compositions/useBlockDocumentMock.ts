import { useBlockSchemaCapabilitiesMock } from './useBlockSchemaCapabilitiesMock'
import { useBlockSchemasMock } from './useBlockSchemaMock'
import { useBlockTypesMock } from './useBlockTypeMock'
import { useSeeds } from './useSeeds'
import { BlockDocument } from '@/models'
import { mocker } from '@/services'
import { choice, repeat, some } from '@/utilities'

export function useBlockDocumentMock(override?: Partial<BlockDocument>): BlockDocument {
  const blockDocument = mocker.create('blockDocument', [override])
  const { blockType, blockSchema } = blockDocument
  const { capabilities } = blockSchema

  useSeeds({
    blockDocuments: [blockDocument],
    blockTypes: [blockType],
    blockSchemas: [blockSchema],
    blockSchemaCapabilities: capabilities,
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