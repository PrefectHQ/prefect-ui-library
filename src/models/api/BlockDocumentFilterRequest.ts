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