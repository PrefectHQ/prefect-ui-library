export type WorkerPoolCreateRequest = Partial<{
  name: string,
  description: string,
  type: string,
  is_paused: boolean,
  concurrency_limit: number,
}>

// export type WorkerPoolEditRequest = Partial<{
//   description: string | null,
//   is_paused: boolean | null,
//   concurrency_limit: number | null,
// }>