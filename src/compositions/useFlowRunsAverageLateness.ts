import { SubscriptionOptions, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { WorkspaceFlowRunsApi } from '@/services/WorkspaceFlowRunsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowRunsAverageLateness = UseEntitySubscription<WorkspaceFlowRunsApi['getFlowRunsAverageLateness'], 'lateness'>

export function useFlowRunsAverageLateness(filter: MaybeRefOrGetter<FlowRunsFilter | null | undefined>, options?: SubscriptionOptions): UseFlowRunsAverageLateness {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters = computed<[FlowRunsFilter] | null>(() => {
    if (!can.read.flow_run) {
      return null
    }
    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  })

  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRunsAverageLateness, parameters, options)
  const lateness = computed(() => subscription.response)

  return {
    subscription,
    lateness,
  }
}