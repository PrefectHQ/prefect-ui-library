import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, MaybeRef, Ref, ref, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { WorkspaceFlowRunsApi } from '@/services'
import { useFlowRunStorage } from '@/services/storage'
import { infiniteScrollCompositionFactory } from '@/utilities/infiniteScroll'

export type UseFlowRuns = {
  flowRuns: ComputedRef<FlowRun[]>,
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
}

// the api currently has a default limit of 200 but we want load smaller pages
// in OSS this can be customized by the user and might not be 200
const FLOW_RUN_LIMIT = 100

export function useFlowRuns(filter: FlowRunsFilter | Ref<FlowRunsFilter | null | undefined>, page: MaybeRef<number> = 1, options?: SubscriptionOptions): UseFlowRuns {
  const filterRef = ref(filter)
  const pageRef = ref(page)
  const can = useCan()
  const api = useWorkspaceApi()

  const parameters = computed<[FlowRunsFilter] | null>(() => {
    if (!filterRef.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    const limit = filterRef.value.limit ?? FLOW_RUN_LIMIT
    const offset = (pageRef.value - 1) * limit

    const filter: FlowRunsFilter = {
      ...filterRef.value,
      limit,
      offset,
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

export const useFlowRunsInfiniteScroll = infiniteScrollCompositionFactory(useFlowRuns, 'flowRuns', FLOW_RUN_LIMIT)