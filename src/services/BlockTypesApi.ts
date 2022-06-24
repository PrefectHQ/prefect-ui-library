import { InjectionKey } from 'vue'
import { Api, ApiRoute } from './Api'
import { mapper } from './Mapper'
import { BlockDocumentResponse } from '@/models/api/BlockDocumentResponse'
import { BlockTypeResponse } from '@/models/api/BlockTypeResponse'
import { BlockDocument } from '@/models/BlockDocument'
import { BlockType } from '@/models/BlockType'
import { BlockTypeFilter } from '@/models/BlockTypeFilter'

export class BlockTypesApi extends Api {

  protected override route: ApiRoute = '/block_types'

  public getBlockType(blockTypeId: string): Promise<BlockType> {
    return this.get<BlockTypeResponse>(`/${blockTypeId}`)
      .then(({ data }) => mapper.map('BlockTypeResponse', data, 'BlockType'))
  }

  public getBlockTypeByName(blockTypeName: string): Promise<BlockType> {
    return this.get<BlockTypeResponse>(`/name/${blockTypeName}`)
      .then(({ data }) => mapper.map('BlockTypeResponse', data, 'BlockType'))
  }

  public getBlockTypes(filter: BlockTypeFilter = {}): Promise<BlockType[]> {
    return this.post<BlockTypeResponse[]>('/filter', mapper.map('BlockTypeFilter', filter, 'BlockTypeFilterRequest'))
      .then(({ data }) => mapper.map('BlockTypeResponse', data, 'BlockType'))
  }

  public getBlockDocumentsByBlockTypeName(blockTypeName: string): Promise<BlockDocument[]> {
    return this.get<BlockDocumentResponse[]>(`/name/${blockTypeName}/block_documents`)
      .then(({ data }) => mapper.map('BlockDocumentResponse', data, 'BlockDocument'))
  }

}

export const blockTypesApiKey: InjectionKey<BlockTypesApi> = Symbol('blockTypesApiKey')