import { CollectionItem, CollectionItemResponse, CollectionsResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapCollectionItemResponseToCollectionItem: MapFunction<CollectionItemResponse, CollectionItem> = function(source) {
  return {
    collectionType: 'flow',
    name: source.name,
    description: source.description.summary,
    returns: source.description.returns,
    examples: source.description.examples,
    documentationUrl: source.documentation_url,
    entrypoint: source.entrypoint,
    installCommand: source.install_command,
    logoUrl: source.logo_url,
    parameters: source.parameters,
    path: source.path_containing_flow,
    repositoryUrl: source.repo_url,
    slug: source.slug,
  }
}

export const mapCollectionResponseToCollectionItems: MapFunction<CollectionsResponse, CollectionItem[]> = function(source) {
  return Object.entries(source).flatMap(([category, collection]) => {
    const mapped = this.map('CollectionItemResponse', Object.values(collection), 'CollectionItem')

    return mapped.map(item => ({ ...item, category }))
  })
}