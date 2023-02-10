import { CollectionFlow, CollectionFlowResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapCollectionFlowResponseToCollectionFlow: MapFunction<CollectionFlowResponse, CollectionFlow> = function(source) {
  return {
    collectionType: 'flow',
    name: source.name,
    description: source.description.summary,
    returns: source.description.returns,
    examples: source.description.examples,
    documentationUrl: source.documentation_url,
    installCommand: source.install_command,
    logoUrl: source.logo_url,
    parameters: source.parameters,
    pathContainingFlow: source.path_containing_flow,
    repositoryUrl: source.repo_url,
    slug: source.slug,
  }
}