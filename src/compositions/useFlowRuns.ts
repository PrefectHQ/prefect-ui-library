import { SubscriptionOptions, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRef, Ref, ref, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { WorkspaceFlowRunsApi } from '@/services'
import { useFlowRunStorage } from '@/services/storage'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseFlowRuns = UseEntitySubscription<WorkspaceFlowRunsApi['getFlowRuns'], 'flowRuns'>

// the api currently has a default limit of 200 but we want load smaller pages
const FLOW_RUN_LIMIT = 100

export function useFlowRunsPage(filter: FlowRunsFilter | Ref<FlowRunsFilter | null | undefined>, page: MaybeRef<number>, options?: SubscriptionOptions): UseFlowRuns {

}

export function useFlowRuns(filter: FlowRunsFilter | Ref<FlowRunsFilter | null | undefined>, options?: SubscriptionOptions): UseFlowRuns {
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

    return undefined
  })

  return {
    subscription,
    flowRuns,
  }
}