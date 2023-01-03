import { Can, WorkspacePermission, canKey, WorkspaceFeatureFlag } from '@/services/can'
import { inject } from '@/utilities/inject'

export function useCan(): Can<WorkspacePermission | WorkspaceFeatureFlag> {
  return inject(canKey)
}