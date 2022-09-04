import { SchemaValues } from '@/types/schemas'

export type BlockDocumentCreateNamed = {
  name: string,
  data: SchemaValues,
  blockSchemaId: string,
  blockTypeId: string,
}

export type BlockDocumentCreateAnonymous = Omit<BlockDocumentCreateNamed, 'name'> & {
  isAnonymous: boolean,
}

export type BlockDocumentCreate = BlockDocumentCreateNamed | BlockDocumentCreateAnonymous