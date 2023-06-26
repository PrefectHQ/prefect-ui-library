import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, MaybeRef, Ref, ref, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useFilterPagination } from '@/compositions/useFilterPagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { WorkspaceFlowRunsApi } from '@/services'
import { useFlowRunStorage } from '@/services/storage'

export type UseFlowRuns = {
  flowRuns: ComputedRef<FlowRun[]>,
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
}

export function useFlowRuns(filter: FlowRunsFilter | Ref<FlowRunsFilter | null | undefined>, page: MaybeRef<number> = 1, options?: SubscriptionOptions): UseFlowRuns {
  const filterRef = ref(filter)
  const pageRef = ref(page)
  const can = useCan()
  const api = useWorkspaceApi()
  const limitRef = computed(() => filterRef.value?.limit)
  const { limit, offset } = useFilterPagination(pageRef, limitRef)

  const parameters = computed<[FlowRunsFilter] | null>(() => {
    if (!filterRef.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    const filter: FlowRunsFilter = {
      ...filterRef.value,
      limit: limit.value,
      offset: offset.value,
    }

    return [filter]
  })

  const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, parameters, options)

  const storage = useFlowRunStorage()

  watch(() => subscription.response, response => {
    if (response) {
      storage.addAll(response)
    }
  })

  const flowRuns = computed(() => {
    if (subscription.response) {
      const ids = subscription.response.map(flowRun => flowRun.id)

      return storage.getAll(ids)
    }

    return []
  })

  return {
    subscription,
    flowRuns,
  }
}