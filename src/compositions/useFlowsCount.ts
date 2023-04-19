import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ref } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services/WorkspaceFlowsApi'
import { MaybeRef } from '@/types'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowsCount = UseEntitySubscription<WorkspaceFlowsApi['getFlowsCount'], 'count'>

export function useFlowsCount(filter?: MaybeRef<FlowsFilter>): UseFlowsCount {
  const api = useWorkspaceApi()
  const filterRef = ref(filter)
  const can = useCan()

  const flowsCountFilter = computed<Parameters<typeof api.flows.getFlowsCount> | null>(() => {
    if (!can.read.flow) {
      return null
    }

    return [filterRef.value]
  })

  const subscription = useSubscriptionWithDependencies(api.flows.getFlowsCount, flowsCountFilter)
  const count = computed(() => subscription.response)

  return {
    subscription,
    count,
  }
}