export type BlockSchemaFilter = {
  offset?: number,
  limit?: number,
  blockSchemas?: {
    blockTypeId?: {
      any_?: string[],
    },
  },
}