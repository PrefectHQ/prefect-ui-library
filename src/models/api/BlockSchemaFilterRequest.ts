// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BlockSchemasFilterRequest } from './Filters'

/**
 * @deprecated
 * @see BlockSchemasFilterRequest
 */
export type BlockSchemaFilterRequest = {
  offset?: number,
  limit?: number,
  block_schemas?: {
    block_type_id?: {
      any_?: string[],
    },
  },
}