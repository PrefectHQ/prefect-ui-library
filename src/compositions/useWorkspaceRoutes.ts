import { workspaceRoutesKey } from '@/router'
import { inject } from '@/utilities/inject'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useWorkspaceRoutes() {
  return inject(workspaceRoutesKey)
}
