export type BlockDocumentFilter = {
  offset?: number,
  limit?: number,
  blockTypes?: {
    name?: string,
    slug?: string[],
  },
}