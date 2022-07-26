export interface IBlockType {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  slug: string,
  logoUrl: string | null,
  documentationUrl: string | null,
  description: string | null,
  codeExample: string | null,
}

export class BlockType implements IBlockType {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public slug: string
  public logoUrl: string | null
  public documentationUrl: string | null
  public description: string | null
  public codeExample: string | null

  public constructor(blockType: IBlockType) {
    this.id = blockType.id
    this.created = blockType.created
    this.updated = blockType.updated
    this.name = blockType.name
    this.slug = blockType.slug
    this.logoUrl = blockType.logoUrl
    this.documentationUrl = blockType.documentationUrl
    this.description = blockType.description
    this.codeExample = blockType.codeExample
  }
}