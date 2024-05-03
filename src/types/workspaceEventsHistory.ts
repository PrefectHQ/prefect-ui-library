import { WorkspaceEventsHistoryUnit } from '@/models/api/workspaceEventsHistoryRequest'
import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'

export type WorkspaceEventsHistory = {
  unit?: WorkspaceEventsHistoryUnit,
  interval?: number,
  filter: WorkspaceEventsFilter,
}
