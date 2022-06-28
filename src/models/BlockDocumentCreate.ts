import { BlockDocumentData } from '@/models/BlockDocument'

export type BlockDocumentCreate = {
  name?: string,
  data: BlockDocumentData,
  blockSchemaId: string,
  blockTypeId: string,
  is_anonymous?: boolean,
}