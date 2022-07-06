import { BlockSchemaCapability } from '@/models/BlockSchema'

export type BlockTypeFilter = {
  blockTypes?: {
    name?: {
      like_?: string | string[],
    },
  },
  blockSchemas?: {
    blockCapabilities?: {
      all_?: BlockSchemaCapability[],
    },
  },
  limit?: number,
  offset?: number,
}