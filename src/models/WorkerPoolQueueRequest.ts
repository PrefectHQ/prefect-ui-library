export type WorkerPoolQueueCreateRequest = {
  name: string,
  description?: string | null,
  // add more fields once I figure out what they are
}

export type WorkerPoolQueueEditRequest = {
  name?: string,
  description?: string | null,
  isPaused?: boolean,
  concurrencyLimit?: number | null,
  priority?: number,
}