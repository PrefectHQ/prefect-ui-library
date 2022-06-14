import { BlockSchemaPropertyType } from './BlockSchema'

export type BlockDocumentFilter = {
  blockSchemaType?: BlockSchemaPropertyType,
  offset?: number,
  limit?: number,
}