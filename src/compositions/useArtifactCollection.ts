import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseArtifactCollection = UseEntitySubscription<WorkspaceArtifactsApi['getArtifactCollection'], 'artifactCollection'>

export function useArtifactCollection(artifactKey: MaybeRefOrGetter<string | null | undefined>): UseArtifactCollection {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.artifact) {
      return null
    }

    const key = toValue(artifactKey)

    if (!key) {
      return null
    }

    return [key]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.artifacts.getArtifactCollection, parameters)
  const artifactCollection = computed(() => subscription.response)

  return {
    subscription,
    artifactCollection,
  }
}