import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Artifact, ArtifactsFilter } from '@/models'
import { WorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'
import { Getter } from '@/types/reactivity'

export type UseTaskRunResult = {
  subscription: UseSubscription<WorkspaceArtifactsApi['getArtifacts']>,
  result: ComputedRef<Artifact | undefined>,
}

export function useTaskRunResult(taskRunId: MaybeRefOrGetter<string | null | undefined>): UseTaskRunResult {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[ArtifactsFilter] | null> = () => {
    if (!can.read.artifact) {
      return null
    }

    const id = toValue(taskRunId)

    if (!id) {
      return null
    }

    const filter: ArtifactsFilter = {
      artifacts: {
        taskRunId: [id],
        type: ['result'],
      },
    }

    return [filter]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.artifacts.getArtifacts, parameters)
  const result = computed(() => subscription.response?.[0])

  return {
    subscription,
    result,
  }
}