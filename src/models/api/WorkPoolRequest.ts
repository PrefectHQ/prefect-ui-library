export type WorkPoolCreateRequest = Partial<{
  name: string,
  description: string,
  type: string,
  is_paused: boolean,
  concurrency_limit: number,
  base_job_template: Record<string, unknown>,
}>

export type WorkPoolEditRequest = Partial<{
  description: string | null,
  is_paused: boolean,
  concurrency_limit: number | null,
  base_job_template: Record<string, unknown>,
}>