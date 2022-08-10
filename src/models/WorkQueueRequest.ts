import { WorkQueueFilterResponse } from '@/models/WorkQueueFilterResponse'

export type WorkQueueCreateRequest = Partial<{
  name: string | null,
  filter: WorkQueueFilterResponse | null,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}>

export type WorkQueueUpdateRequest = Partial<{
  filter: WorkQueueFilterResponse | null,
  description: string | null,
  is_paused: boolean | null,
  concurrency_limit: number | null,
}>