export type BlockTypeFilterRequest = {
  block_schemas?: {
    block_capabilities?: {
      all_?: string[],
    },
  },
  limit?: number,
  offset?: number,
}