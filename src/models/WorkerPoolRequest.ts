export type WorkerPoolCreateRequest = Partial<{
  name: string | null,
  description: string | null,
  type: string | null,
}>

export type WorkerPoolEditRequest = Partial<{
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}>