import { BlockTypeResponse } from '@/models/api/BlockTypeResponse'
import { BlockType } from '@/models/BlockType'
import { MapFunction } from '@/services/Mapper'

export const mapBlockTypeResponseToBlockType: MapFunction<BlockTypeResponse, BlockType> = function(source) {
  return new BlockType({
    id: source.id,
    name: source.name,
    slug: source.slug,
    logoUrl: source.logo_url,
    documentationUrl: source.documentation_url,
    description: source.description,
    codeExample: source.code_example,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
  })
}