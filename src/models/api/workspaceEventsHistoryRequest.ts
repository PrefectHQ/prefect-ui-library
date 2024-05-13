import { WorkspaceEventsFilterRequest } from '@/models/api/workspaceEventsFilterRequest'

export type WorkspaceEventsHistoryUnit = 'week' | 'day' | 'hour' | 'minute' | 'second'

export type WorkspaceEventsHistoryRequest = {
  filter?: WorkspaceEventsFilterRequest['filter'],
  time_unit?: WorkspaceEventsHistoryUnit,
  time_interval?: number,
}