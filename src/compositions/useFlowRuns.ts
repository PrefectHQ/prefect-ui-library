import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash/merge'
import { computed, ComputedRef, MaybeRef, MaybeRefOrGetter, ref, toRef, toValue, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useFilterPagination } from '@/compositions/useFilterPagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { WorkspaceFlowRunsApi } from '@/services'
import { useFlowRunStorage } from '@/services/storage'
import { Getter } from '@/types/reactivity'

export type UseFlowRuns = {
  flowRuns: ComputedRef<FlowRun[]>,
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
}

export function useFlowRuns(filter: MaybeRefOrGetter<FlowRunsFilter | null | undefined>, page: MaybeRef<number> = 1, options?: SubscriptionOptions): UseFlowRuns {
  const pageRef = ref(page)
  const can = useCan()
  const api = useWorkspaceApi()
  const filterRef = toRef(filter)
  const limitRef = computed(() => filterRef.value?.limit)
  const { limit, offset } = useFilterPagination(pageRef, limitRef)

  const getter: Getter<[FlowRunsFilter] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const filterValue = toValue(filter)

    if (!filterValue) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    const parameter: FlowRunsFilter = merge({}, filterValue, {
      limit: limit.value,
      offset: offset.value,
    })

    return [parameter]
  }

  const parameters = toRef(getter)

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