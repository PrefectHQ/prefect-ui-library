import { BlockSchema } from './BlockSchema'
import { SchemaValues } from '@/types/schemas'

export type BlockDocumentUpdate = {
  blockSchema: BlockSchema,
  data: SchemaValues,
  mergeExistingData?: boolean,
}