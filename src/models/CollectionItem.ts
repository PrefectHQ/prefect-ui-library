export type CollectionItem<T extends 'flow' | 'block'> = {
  collectionType: T,
  name: string,
  description: string,
  logoUrl: string,
}