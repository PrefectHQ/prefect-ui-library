import { kebabCase } from '@prefecthq/prefect-design'
import { CollectionFlow } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomCollectionFlow: MockFunction<CollectionFlow, [Partial<CollectionFlow>?]> = function(overrides) {
  const name = this.create('runName')

  return {
    name,
    collectionType: 'flow',
    description: this.create('sentence'),
    returns: this.create('string'),
    examples: this.createMany('paragraph', 1),
    documentationUrl: this.create('string'),
    installCommand: this.create('string'),
    logoUrl: this.create('image'),
    pathContainingFlow: this.create('string'),
    repositoryUrl: this.create('string'),
    slug: kebabCase(name),
    parameters: null,
    ...overrides,
  }
}