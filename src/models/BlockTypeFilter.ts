export type BlockTypeFilter = {
  blockSchemas?: {
    blockCapabilities?: {
      all_?: string[],
    },
  },
  limit?: number,
  offset?: number,
}