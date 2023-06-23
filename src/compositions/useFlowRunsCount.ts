import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, Ref, computed, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { WorkspaceFlowRunsApi } from '@/services/WorkspaceFlowRunsApi'

export type UseFlowRunsCount = {
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRunsCount']>,
  count: ComputedRef<number | undefined>,
}

export function useFlowRunsCount(filter: FlowRunsFilter | Ref<FlowRunsFilter | null | undefined>, options?: SubscriptionOptions): UseFlowRunsCount {
  const api = useWorkspaceApi()
  const can = useCan()
  const filterRef = ref(filter)

  const parameters = computed<[FlowRunsFilter] | null>(() => {
    if (!filterRef.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [filterRef.value]
  })

  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRunsCount, parameters, options)
  const count = computed(() => subscription.response)

  return {
    count,
    subscription,
  }
}