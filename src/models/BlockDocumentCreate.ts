import { BlockDocumentData } from '@/models/BlockDocument'

export type BlockDocumentCreateNamed = {
  name: string,
  data: BlockDocumentData,
  blockSchemaId: string,
  blockTypeId: string,
}

export type BlockDocumentCreateAnonymous = Omit<BlockDocumentCreateNamed, 'name'> & {
  isAnonymous: boolean,
}

export type BlockDocumentCreate = BlockDocumentCreateNamed | BlockDocumentCreateAnonymous