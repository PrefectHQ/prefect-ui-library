import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceFlowRunsApi } from '@/services'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowRun = UseEntitySubscription<WorkspaceFlowRunsApi['getFlowRun']>

export function useFlowRun(flowRunId: string | Ref<string | null | undefined>): UseFlowRun {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(flowRunId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRun, parameters)
  const flowRun = computed(() => subscription.response)

  return {
    subscription,
    flowRun,
  }
}