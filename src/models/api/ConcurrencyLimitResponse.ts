export type ConcurrencyLimitResponse = {
  tag: string,
  concurrency_limit: number,
  id: string,
  created?: Date,
  updated?: Date,
  active_slots?: string[],
}