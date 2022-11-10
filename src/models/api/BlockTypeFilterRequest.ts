// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BlockTypesFilterRequest } from './Filters'

/**
 * @deprecated
 * @see BlockTypesFilterRequest
 */
export type BlockTypeFilterRequest = {
  block_schemas?: {
    block_capabilities?: {
      all_?: string[],
    },
  },
  limit?: number,
  offset?: number,
}