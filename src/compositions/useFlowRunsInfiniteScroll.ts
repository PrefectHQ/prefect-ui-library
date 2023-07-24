import { SubscriptionOptions, UseSubscription, useSubscription } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, onUnmounted, reactive, ref, toRef, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { GLOBAL_API_LIMIT, useFilterPagination } from '@/compositions/useFilterPagination'
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

export function useFlowRunsInfiniteScroll(filter: MaybeRefOrGetter<FlowRunsFilter | null | undefined>, options?: SubscriptionOptions): UseFlowRunsInfiniteScroll {
  const filterRef = toRef(filter)
  const can = useCan()
  const api = useWorkspaceApi()
  const storage = useFlowRunStorage()
  const page = ref(0)
  const pages = reactive<UseSubscription<FlowRunsAction>[]>([])
  const pageLimit = computed(() => filterRef.value?.limit ?? GLOBAL_API_LIMIT)

  const flowRuns = computed(() => pages.flatMap(page => page.response ?? []))
  const { subscriptions } = useSubscriptions(pages)

  function canLoadMore(): boolean {
    const loadedMaxPages = pages.length * pageLimit.value > flowRuns.value.length

    return !loadedMaxPages && !!can.read.flow_run && !!filterRef.value
  }

  function loadMore(): void {
    if (!canLoadMore()) {
      return
    }

    page.value++

    const { limit, offset } = useFilterPagination(page.value, pageLimit.value)

    const filter: FlowRunsFilter = {
      ...filterRef.value,
      limit: limit.value,
      offset: offset.value,
    }

    const subscription = useSubscription(api.flowRuns.getFlowRuns, [filter], options)

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