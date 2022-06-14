import { BlockTypeResponse } from '@/models/api/BlockTypeResponse'
import { BlockType } from '@/models/BlockType'
import { MapFunction } from '@/services/Mapper'

export const mapBlockTypeResponseToBlockType: MapFunction<BlockTypeResponse, BlockType> = function(source: BlockTypeResponse): BlockType {
  return new BlockType({
    id: source.id,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    name: source.name,
    logoUrl: source.logo_url,
    documentationUrl: source.documentation_url,
  })
}