export type ConcurrencyLimit = {
  tag: string,
  concurrencyLimit: number,
  id: string,
  created?: Date,
  updated?: Date,
  activeSlots?: string[],
}