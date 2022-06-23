import { BlockSchema } from './BlockSchema'
import { BlockType } from './BlockType'


export type BlockDocumentReferenceData = {
  $ref: {
    blockDocumentId: string,
  },
}

export type BlockDocumentData = Record<string, unknown | BlockDocumentReferenceData>

export interface IBlockDocument {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  data: BlockDocumentData,
  blockSchemaId: string,
  blockSchema: BlockSchema,
  blockTypeId: string,
  blockType: BlockType,
  blockDocumentReferences: Record<string, unknown>,
}

export class BlockDocument implements IBlockDocument {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public name: string
  public data: BlockDocumentData
  public blockSchemaId: string
  public blockSchema: BlockSchema
  public blockTypeId: string
  public blockType: BlockType
  public blockDocumentReferences: Record<string, unknown>

  public constructor(blockDocument: IBlockDocument) {
    this.id = blockDocument.id
    this.created = blockDocument.created
    this.updated = blockDocument.updated
    this.name = blockDocument.name
    this.data = blockDocument.data
    this.blockSchemaId = blockDocument.blockSchemaId
    this.blockSchema = blockDocument.blockSchema
    this.blockTypeId = blockDocument.blockTypeId
    this.blockType = blockDocument.blockType
    this.blockDocumentReferences = blockDocument.blockDocumentReferences
  }
}