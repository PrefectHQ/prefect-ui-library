import { Api, ApiRoute } from './Api'
import { mapper } from './Mapper'
import { BlockTypeResponse } from '@/models/api/BlockTypeResponse'
import { BlockType } from '@/models/BlockType'
import { BlockTypeFilter } from '@/models/BlockTypeFilter'

export class BlockTypesApi extends Api {

  protected override route: ApiRoute = '/block_types'

  public getBlockType(blockTypeId: string): Promise<BlockType> {
    return this.get<BlockTypeResponse>(`/${blockTypeId}`)
      .then(({ data }) => mapper.map('BlockTypeResponse', data, 'BlockType'))
  }

  public getBlockTypes(filter: BlockTypeFilter = {}): Promise<BlockType[]> {
    return this.post<BlockTypeResponse[]>('/filter', mapper.map('BlockTypeFilter', filter, 'BlockTypeFilterRequest'))
      .then(({ data }) => mapper.map('BlockTypeResponse', data, 'BlockType'))
  }

}