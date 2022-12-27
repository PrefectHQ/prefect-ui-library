export type WorkQueueCreateRequest = Partial<{
  name: string | null,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}>

export type WorkQueueEditRequest = Partial<{
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}>