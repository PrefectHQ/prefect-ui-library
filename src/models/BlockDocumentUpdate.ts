import { BlockSchema } from '@/models/BlockSchema'
import { SchemaValues } from '@/types/schemas'

export type BlockDocumentUpdate = {
  blockSchema: BlockSchema,
  data: SchemaValues,
  mergeExistingData?: boolean,
}