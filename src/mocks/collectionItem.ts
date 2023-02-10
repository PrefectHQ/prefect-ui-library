import { kebabCase } from '@prefecthq/prefect-design'
import { CollectionItem } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomCollectionItem: MockFunction<CollectionItem, [Partial<CollectionItem>?]> = function(overrides) {
  const name = this.create('runName')

  return {
    name,
    collectionType: 'flow',
    description: this.create('sentence'),
    returns: this.create('string'),
    examples: this.createMany('paragraph', 1),
    documentationUrl: this.create('string'),
    entrypoint: this.create('string'),
    installCommand: this.create('string'),
    logoUrl: this.create('image'),
    path: this.create('string'),
    repositoryUrl: this.create('string'),
    slug: kebabCase(name),
    parameters: null,
    ...overrides,
  }
}