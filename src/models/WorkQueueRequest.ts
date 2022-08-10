export type WorkQueueCreateRequest = Partial<{
  name: string | null,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}>

export type WorkQueueUpdateRequest = Partial<{
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}>