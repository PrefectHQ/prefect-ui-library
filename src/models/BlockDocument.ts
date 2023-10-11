import { BlockSchema } from '@/models/BlockSchema'
import { BlockType } from '@/models/BlockType'
import { ObjectLevelCan } from '@/models/ObjectLevelCan'
import { SchemaValues } from '@/types/schemas'

export type BlockDocumentReference = {
  blockType: BlockType,
  id: string,
  isAnonymous: boolean,
  name: string,
}

export type BlockDocumentReferences = Record<string, BlockDocumentReference | undefined>

export interface IBlockDocument {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  isAnonymous: boolean,
  data: SchemaValues,
  blockSchemaId: string,
  blockSchema: BlockSchema,
  blockTypeId: string,
  blockType: BlockType,
  blockDocumentReferences: Record<string, unknown>,
  can: ObjectLevelCan<'block'>,
}

export class BlockDocument implements IBlockDocument {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public readonly isAnonymous: boolean
  public name: string
  public data: SchemaValues
  public blockSchemaId: string
  public blockSchema: BlockSchema
  public blockTypeId: string
  public blockType: BlockType
  public blockDocumentReferences: Record<string, unknown>
  public can: ObjectLevelCan<'block'>

  public constructor(blockDocument: IBlockDocument) {
    this.id = blockDocument.id
    this.created = blockDocument.created
    this.updated = blockDocument.updated
    this.isAnonymous = blockDocument.isAnonymous
    this.name = blockDocument.name
    this.data = blockDocument.data
    this.blockSchemaId = blockDocument.blockSchemaId
    this.blockSchema = blockDocument.blockSchema
    this.blockTypeId = blockDocument.blockTypeId
    this.blockType = blockDocument.blockType
    this.blockDocumentReferences = blockDocument.blockDocumentReferences
    this.can = blockDocument.can
  }
}