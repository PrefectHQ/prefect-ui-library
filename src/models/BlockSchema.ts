import { BlockType } from './BlockType'

export type BlockSchemaFieldsType = 'object'

export const blockSchemaPropertyTypes = ['string', 'number', 'integer', 'boolean', 'array', 'object', 'password'] as const
export type BlockSchemaPropertyType = typeof blockSchemaPropertyTypes[number]

export const blockSchemaCapabilities = ['writeable', 'readable', 'storage', 'notify'] as const
export type BlockSchemaCapability = typeof blockSchemaCapabilities[number]

export type BlockSchemaSimpleProperty = {
  title: string,
  description: string,
  type?: BlockSchemaPropertyType,
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
  required?: string[],
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

export const isBlockSchemaSimpleProperty = (property: BlockSchemaProperty): property is BlockSchemaSimpleProperty => {
  return 'title' in property
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

    // TODO: REMOVE THIS SHIM
    if (this.fields.title.toLowerCase() == 's3storageblock') {
      const expression = /\baws\b/gi

      Object.keys(this.fields.properties).forEach((key) => {
        const property = this.fields.properties[key]

        if (isBlockSchemaSimpleProperty(property)) {
          property.title = property.title.replace(expression, 'AWeSome')
        }
      })
    }
  }
}