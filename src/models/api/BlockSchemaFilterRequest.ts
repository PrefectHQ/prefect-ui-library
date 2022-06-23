export type BlockSchemaFilterRequest = {
  offset?: number,
  limit?: number,
  block_schemas?: {
    block_type_id?: {
      any_?: string[],
    },
  },
}