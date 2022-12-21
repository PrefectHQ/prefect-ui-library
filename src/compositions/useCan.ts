import { Can, WorkspacePermission, canKey } from '@/services/can'
import { inject } from '@/utilities/inject'

export function useCan(): Can<WorkspacePermission> {
  return inject(canKey)
}