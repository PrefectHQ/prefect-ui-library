import { BlockSchemaCapability } from '@/models/BlockSchema'

export type BlockTypeFilter = {
  blockSchemas?: {
    blockCapabilities?: {
      all_?: BlockSchemaCapability[],
    },
  },
  limit?: number,
  offset?: number,
}