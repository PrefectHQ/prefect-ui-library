import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, Ref, computed, onUnmounted, reactive, ref, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { GLOBAL_API_LIMIT } from '@/compositions/useFilterPagination'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { useFlowRunStorage } from '@/services/storage/flowRunStorage'
import { WorkspaceFlowRunsApi } from '@/services/WorkspaceFlowRunsApi'
import { uniqueValueWatcher, getValidWatchSource } from '@/utilities/reactivity'

type FlowRunsAction = WorkspaceFlowRunsApi['getFlowRuns'] | (() => undefined)

export type UseFlowRunsInfiniteScroll = {
  flowRuns: ComputedRef<FlowRun[]>,
  subscriptions: UseSubscriptions<FlowRunsAction>['subscriptions'],
  loadMore: () => void,
}

export function useFlowRunsInfiniteScroll(filter: FlowRunsFilter | Ref<FlowRunsFilter | null | undefined>, options?: SubscriptionOptions): UseFlowRunsInfiniteScroll {
  const filterRef = ref(filter)
  const can = useCan()
  const api = useWorkspaceApi()
  const storage = useFlowRunStorage()
  const page = ref(0)
  const pages = reactive<UseSubscription<FlowRunsAction>[]>([])
  const limit = computed(() => filterRef.value?.limit ?? GLOBAL_API_LIMIT)

  const parameters = computed<[FlowRunsFilter] | null>(() => {
    if (!filterRef.value) {
      return null
    }

    if (!can.read.flow_run) {
      return null
    }

    return [filterRef.value]
  })

  const flowRuns = computed(() => pages.flatMap(page => page.response ?? []))
  const { subscriptions } = useSubscriptions(pages)

  function loadMore(): void {
    if (pages.length * limit.value > flowRuns.value.length) {
      return
    }

    page.value++

    const subscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, parameters, options)

    pages.push(subscription)
  }

  const unwatch = uniqueValueWatcher(getValidWatchSource(filter), () => {
    if (!subscriptions.isSubscribed()) {
      unwatch!()
      return
    }

    page.value = 0
    subscriptions.unsubscribe()
    pages.splice(0)

    loadMore()
  })

  onUnmounted(() => {
    subscriptions.unsubscribe()
    unwatch()
  })

  watch(flowRuns, flowRuns => {
    storage.addAll(flowRuns)
  })

  const storageFlowRuns = computed(() => {
    const ids = flowRuns.value.map(flowRun => flowRun.id)

    return storage.getAll(ids)
  })

  return {
    flowRuns: storageFlowRuns,
    subscriptions,
    loadMore,
  }
}