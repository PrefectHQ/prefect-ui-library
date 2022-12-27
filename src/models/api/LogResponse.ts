import { LogLevel } from '@/models/Log'

export type LogResponse = {
  id: string,
  created: string,
  updated: string,
  name: string,
  level: LogLevel,
  message: string,
  timestamp: string,
  flow_run_id: string,
  task_run_id: string | null,
}