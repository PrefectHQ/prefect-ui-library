export type WorkPoolQueueCreateRequest = Partial<{
  name: string,
  description: string | null,
  is_paused: boolean,
  concurrency_limit: number | null,
  priority: number,
}>

export type WorkPoolQueueEditRequest = {
  name?: string,
  description?: string | null,
  is_paused?: boolean,
  concurrency_limit?: number | null,
  priority?: number,
}