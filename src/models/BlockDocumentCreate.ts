import { BlockSchema } from '@/models/BlockSchema'
import { SchemaValues } from '@/types/schemas'

export type BlockDocumentCreateNamed = {
  name: string,
  data: SchemaValues,
  blockSchema: BlockSchema,
}

export type BlockDocumentCreateAnonymous = Omit<BlockDocumentCreateNamed, 'name'> & {
  isAnonymous: boolean,
}

export type BlockDocumentCreate = BlockDocumentCreateNamed | BlockDocumentCreateAnonymous

export function isBlockDocumentCreateNamed(blockDocumentCreate: BlockDocumentCreate): blockDocumentCreate is BlockDocumentCreateNamed {
  return 'name' in blockDocumentCreate
}