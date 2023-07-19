import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseArtifact = UseEntitySubscription<WorkspaceArtifactsApi['getArtifact'], 'artifact'>

export function useArtifact(artifactId: MaybeRefOrGetter<string | null | undefined>): UseArtifact {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.artifact) {
      return null
    }

    const id = toValue(artifactId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.artifacts.getArtifact, parameters)
  const artifact = computed(() => subscription.response)

  return {
    subscription,
    artifact,
  }
}