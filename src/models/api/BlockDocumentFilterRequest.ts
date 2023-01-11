// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BlockDocumentsFilterRequest } from './Filters'

/**
 * @deprecated
 * @see BlockDocumentsFilterRequest
 */
export type BlockDocumentFilterRequest = {
  offset?: number,
  limit?: number,
  block_types?: {
    name?: {
      like_?: string,
    },
    slug?: {
      any_?: string[],
    },
  },
}