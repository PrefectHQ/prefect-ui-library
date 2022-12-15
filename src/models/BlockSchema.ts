import { BlockType } from '@/models/BlockType'
import { Schema } from '@/types/schemas'

export interface IBlockSchema {
  id: string,
  created: Date,
  updated: Date,
  checksum: string,
  fields: Schema,
  blockTypeId: string,
  blockType: BlockType,
  capabilities: string[],
}

export class BlockSchema implements IBlockSchema {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public checksum: string
  public fields: Schema
  public blockTypeId: string
  public blockType: BlockType
  public capabilities: string[]

  public constructor(blockSchema: IBlockSchema) {
    this.id = blockSchema.id
    this.created = blockSchema.created
    this.updated = blockSchema.updated
    this.checksum = blockSchema.checksum
    this.fields = blockSchema.fields
    this.blockTypeId = blockSchema.blockTypeId
    this.blockType = blockSchema.blockType
    this.capabilities = blockSchema.capabilities
  }
}