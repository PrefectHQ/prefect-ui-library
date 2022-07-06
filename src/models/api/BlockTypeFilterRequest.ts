export type BlockTypeFilterRequest = {
  block_schemas?: {
    block_capabilities?: {
      all_?: string[],
    },
  },
  block_types?: {
    name?: {
      like_?: string | string[],
    },
  },
  limit?: number,
  offset?: number,
}