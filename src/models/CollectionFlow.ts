import { CollectionItem } from '@/models/CollectionItem'

export type CollectionFlow = CollectionItem<'flow'> & {
  returns: string,
  examples: string[],
  documentationUrl: string,
  installCommand: string,
  parameters: unknown,
  pathContainingFlow: string,
  repositoryUrl: string,
  slug: string,
}