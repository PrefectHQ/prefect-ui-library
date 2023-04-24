import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseArtifactCollection = UseEntitySubscription<WorkspaceArtifactsApi['getArtifactCollection'], 'artifactCollection'>

export function useArtifactCollection(artifactKey: string | Ref<string | null | undefined>): UseArtifactCollection {
  const api = useWorkspaceApi()
  const can = useCan()
  const key = ref(artifactKey)

  const parameters = computed<[string] | null>(() => {
    if (!can.read.artifact) {
      return null
    }

    if (!key.value) {
      return null
    }

    return [key.value]
  })

  const subscription = useSubscriptionWithDependencies(api.artifacts.getArtifactCollection, parameters)
  const artifactCollection = computed(() => subscription.response)

  return {
    subscription,
    artifactCollection,
  }
}