import { Parameters } from '@/models/Parameters'
import { Schedule } from '@/models/Schedule'

export type DeploymentUpdate = Partial<{
  description: string | null,
  schedule: Schedule | null,
  isScheduleActive: boolean,
  parameters: Parameters | null,
  tags: string[] | null,
}>