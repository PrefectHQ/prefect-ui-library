import { CreateApi, workspaceApiKey } from '@/utilities/api'
import { inject } from '@/utilities/inject'

export function useWorkspaceApi(): CreateApi {
  return inject(workspaceApiKey)
}