import { isArray } from '@prefecthq/prefect-design'
import { Action, SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, getCurrentInstance, isReactive, isRef, MaybeRef, onUnmounted, reactive, Ref, ref, watch, WatchEffect, WatchSource } from 'vue'
import { FlowRun } from '..'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models/Filters'
import { FlowRun } from '@/models/FlowRun'
import { WorkspaceFlowRunsApi } from '@/services'
import { useFlowRunStorage } from '@/services/storage'
import { uniqueValueWatcher } from '@/utilities/reactivity'

export type UseFlowRuns = {
  flowRuns: ComputedRef<FlowRun[]>,
  subscription: UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>,
}

// the api currently has a default limit of 200 but we want load smaller pages
const FLOW_RUN_LIMIT = 100

export type FlowRunsPageFilter = Omit<FlowRunsFilter, 'limit' | 'offset'>

export function useFlowRunsPage(filter: FlowRunsPageFilter | Ref<FlowRunsPageFilter | null | undefined>, page: MaybeRef<number> = 1, options?: SubscriptionOptions): UseFlowRuns {
  const filterRef = ref(filter)
  const pageRef = ref(page)
  const filterWithOffset = computed<FlowRunsFilter | null>(() => {
    if (!filterRef.value) {
      return null
    }

    const offset = (pageRef.value - 1) * FLOW_RUN_LIMIT

    const filter: FlowRunsFilter = {
      ...filterRef.value,
      limit: FLOW_RUN_LIMIT,
      offset,
    }

    return filter
  })

  return useFlowRuns(filterWithOffset, options)
}

type UseSubscriptions<T extends Action> = {
  subscription: Omit<UseSubscription<T>, 'promise' | 'response'> & {
    response: Awaited<ReturnType<T> | undefined>[],
  },
}

function useSubscriptions<T extends Action>(subscriptions: UseSubscription<T>[]): UseSubscriptions<T> {
  const loading = computed(() => subscriptions.some(subscription => subscription.loading))
  const errored = computed(() => subscriptions.some(subscription => subscription.errored))
  const error = computed(() => subscriptions.length ? subscriptions[0].error : undefined)
  const executed = computed(() => subscriptions.some(subscription => subscription.executed))
  const response = computed(() => subscriptions.map(subscription => subscription.response))
  const unsubscribe = (): void => {
    subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  const refresh = async (): Promise<void> => {
    const promises = subscriptions.map(subscription => subscription.refresh())

    await Promise.all(promises)
  }

  const isSubscribed = (): boolean => {
    return subscriptions.every(subscription => subscription.isSubscribed())
  }

  const subscription: UseSubscriptions<T>['subscription'] = reactive({
    loading,
    errored,
    error,
    executed,
    response,
    unsubscribe,
    refresh,
    isSubscribed,
  })

  return { subscription }
}


type UseInfiniteScrolling = {
  flowRuns: ComputedRef<FlowRun[]>,
  subscription: UseSubscriptions<WorkspaceFlowRunsApi['getFlowRuns']>['subscription'],
  loadMore: () => void,
}

export function getValidWatchSource(source: unknown): WatchSource | WatchSource[] | WatchEffect | object {
  if (isValidWatchValue(source)) {
    return source
  }

  if (isArray(source)) {
    return source.filter(value => isValidWatchValue(value))
  }

  return []
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(value: unknown): value is (...args: any[]) => unknown {
  return typeof value === 'function'
}

function isValidWatchValue(value: unknown): value is WatchSource | WatchEffect {
  return isRef(value) || isReactive(value) || isFunction(value)
}

export function useInfiniteScrolling(filter: FlowRunsPageFilter | Ref<FlowRunsPageFilter | null | undefined>, options?: SubscriptionOptions): UseInfiniteScrolling {
  const pages = ref(0)
  const subscriptions = reactive<UseSubscription<WorkspaceFlowRunsApi['getFlowRuns']>[]>([])

  function loadMore(): void {
    pages.value++

    const { subscription } = useFlowRunsPage(filter, pages.value, options)

    subscriptions.push(subscription)
  }

  const flowRuns = computed<FlowRun[]>(() => subscriptions.flatMap(subscription => subscription.response ?? []))
  const { subscription } = useSubscriptions(subscriptions)

  const unwatch = uniqueValueWatcher(getValidWatchSource(filter), () => {
    if (!subscription.isSubscribed()) {
      unwatch!()
      return
    }

    pages.value = 0
    subscription.unsubscribe()
    subscriptions.splice(0)

    loadMore()
  })

  if (getCurrentInstance()) {
    onUnmounted(() => {
      subscription.unsubscribe()
      unwatch()
    })
  }

  return {
    flowRuns,
    loadMore,
    subscription,
  }
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

    return []
  })

  return {
    subscription,
    flowRuns,
  }
}