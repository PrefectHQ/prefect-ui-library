import { BlockTypeResponse } from '@/models/api/BlockTypeResponse'
import { BlockType } from '@/models/BlockType'
import { MapFunction } from '@/services/Mapper'
import { mapSnakeToCamelCase } from '@/utilities'

export const mapBlockTypeResponseToBlockType: MapFunction<BlockTypeResponse, BlockType> = function(source: BlockTypeResponse): BlockType {
  return new BlockType({
    ...mapSnakeToCamelCase(source),
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
  })
}