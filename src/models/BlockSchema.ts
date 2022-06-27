import { BlockType } from './BlockType'

export type BlockSchemaFieldsType = 'object'

export const blockSchemaPropertyTypes = ['string', 'number', 'integer', 'boolean', 'array', 'object'] as const
export type BlockSchemaPropertyType = typeof blockSchemaPropertyTypes[number]

export const blockSchemaCapabilities = ['writable', 'readable', 'storage'] as const
export type BlockSchemaCapability = typeof blockSchemaCapabilities[number]

export type BlockSchemaSimpleProperty = {
  title: string,
  description: string,
  type: BlockSchemaPropertyType,
  enum?: string[] | number[],
}

export type BlockSchemaReferenceProperty = {
  $ref: 'string',
}

export type BlockSchemaProperty = BlockSchemaSimpleProperty | BlockSchemaReferenceProperty

export type BlockSchemaReference = {
  blockSchemaChecksum: string,
  blockTypeName: string,
}

export type BlockSchemaReferences = Record<string, BlockSchemaReference | undefined>

export type BlockSchemaFields = {
  title: string,
  description: string,
  type: BlockSchemaFieldsType,
  properties: Record<string, BlockSchemaProperty>,
  required: string[],
  blockTypeName: string,
  blockSchemaReferences: BlockSchemaReferences,
}

export interface IBlockSchema {
  id: string,
  created: Date,
  updated: Date,
  checksum: string,
  fields: BlockSchemaFields,
  blockTypeId: string,
  blockType: BlockType,
  capabilities: BlockSchemaCapability[],
}

export class BlockSchema implements IBlockSchema {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public checksum: string
  public fields: BlockSchemaFields
  public blockTypeId: string
  public blockType: BlockType
  public capabilities: BlockSchemaCapability[]

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