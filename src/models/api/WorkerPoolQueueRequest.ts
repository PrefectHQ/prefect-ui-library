export type WorkerPoolQueueCreateRequest = Partial<{
  name: string,
  description: string | null,
  is_paused: boolean,
  concurrency_limit: number | null,
  priority: number,
}>

export type WorkerPoolQueueEditRequest = {
  name?: string,
  description?: string | null,
  is_paused?: boolean,
  concurrency_limit?: number | null,
  priority?: number,
}