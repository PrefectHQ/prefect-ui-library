export interface IBlockType {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  logoUrl: string,
  documentationUrl: string,
}

export class BlockType implements IBlockType {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public logoUrl: string
  public documentationUrl: string

  public constructor(blockType: IBlockType) {
    this.id = blockType.id
    this.created = blockType.created
    this.updated = blockType.updated
    this.name = blockType.name
    this.logoUrl = blockType.logoUrl
    this.documentationUrl = blockType.documentationUrl
  }
}