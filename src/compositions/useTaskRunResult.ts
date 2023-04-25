import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, computed, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Artifact, ArtifactsFilter } from '@/models'
import { WorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'
import { MaybeRef } from '@/types'

export type UseTaskRunResult = {
  subscription: UseSubscription<WorkspaceArtifactsApi['getArtifacts']>,
  result: ComputedRef<Artifact | undefined>,
}

export function useTaskRunResult(taskRunId: MaybeRef<string | null | undefined>): UseTaskRunResult {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(taskRunId)

  const filter = computed<[ArtifactsFilter] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.artifact) {
      return null
    }

    return [
      {
        artifacts: {
          taskRunId: [id.value],
          type: ['result'],
        },
      },
    ]
  })

  const subscription = useSubscriptionWithDependencies(api.artifacts.getArtifacts, filter)
  const result = computed(() => subscription.response?.[0])

  return {
    subscription,
    result,
  }
}