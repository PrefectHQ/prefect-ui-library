import { Can, WorkspacePermission, canKey, FeatureFlags } from '@/services/can'
import { inject } from '@/utilities/inject'

export function useCan(): Can<WorkspacePermission | FeatureFlags> {
  return inject(canKey)
}