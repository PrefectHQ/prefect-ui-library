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

  public getBlockTypeBySlug(blockTypeSlug: string): Promise<BlockType> {
    return this.get<BlockTypeResponse>(`/slug/${blockTypeSlug}`)
      .then(({ data }) => mapper.map('BlockTypeResponse', data, 'BlockType'))
  }

  public getBlockTypes(filter: BlockTypeFilter = {}): Promise<BlockType[]> {
    return this.post<BlockTypeResponse[]>('/filter', mapper.map('BlockTypeFilter', filter, 'BlockTypeFilterRequest'))
      .then(({ data }) => mapper.map('BlockTypeResponse', data, 'BlockType'))
  }

  public getBlockDocumentsByBlockTypeSlug(blockTypeSlug: string): Promise<BlockDocument[]> {
    return this.get<BlockDocumentResponse[]>(`/slug/${blockTypeSlug}/block_documents`)
      .then(({ data }) => mapper.map('BlockDocumentResponse', data, 'BlockDocument'))
  }

}

export const blockTypesApiKey: InjectionKey<BlockTypesApi> = Symbol('blockTypesApiKey')