import { Schedule } from '@/models/Schedule'
import { SchemaValues } from '@/types/schemas'

export type DeploymentUpdate = Partial<{
  description: string | null,
  schedule: Schedule | null,
  isScheduleActive: boolean,
  parameters: SchemaValues | null,
  tags: string[] | null,
}>