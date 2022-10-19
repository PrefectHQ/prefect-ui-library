import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRun } from '@/models/FlowRun'

export function useFlowRun(flowRunId: string | Ref<string | null | undefined>): ComputedRef<FlowRun | undefined> {
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

  return flowRun
}