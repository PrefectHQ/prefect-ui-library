import { useSubscription, ActionArguments, ActionResponse, SubscribeArguments, UseSubscription, unrefArgs, watchableArgs } from '@prefecthq/vue-compositions'
import { computed, getCurrentInstance, onUnmounted, reactive, ref, watch } from 'vue'
import { uniqueValueWatcher } from '@/utilities/reactivity'

export type Paginated = { limit?: number, offset?: number }
// any is correct here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PaginatedAction = (filters: Paginated) => Promise<any[]>
export type UsePaginatedSubscription<T extends PaginatedAction> = {
  loadMore: () => void,
} & Omit<UseSubscription<T>, 'promise'>

/**
 * @deprecated Use dedicated compositions such as useFlowRunInfiniteScroll instead
 */
export function usePaginatedSubscription<T extends PaginatedAction>(...[action, args, options = {}]: SubscribeArguments<T>): UsePaginatedSubscription<T> {
  const subscriptions = reactive<UseSubscription<T>[]>([])
  const argsWithDefault = args ?? [] as unknown as ActionArguments<T>
  const pages = ref(0)
  const watchable = watchableArgs(argsWithDefault)

  let unwatch: ReturnType<typeof watch> | undefined

  const loading = computed(() => subscriptions.some(subscription => subscription.loading))
  const errored = computed(() => subscriptions.some(subscription => subscription.errored))
  const error = computed(() => subscriptions.length ? subscriptions[0].error : undefined)
  const executed = computed(() => subscriptions.some(subscription => subscription.executed))
  const response = computed(() => subscriptions.flatMap(subscription => subscription.response ?? []) as ActionResponse<T>)

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

  const loadMore = (): void => {
    const [unwrappedFilters] = unrefArgs(argsWithDefault)
    const limit = unwrappedFilters.limit ?? 200

    if (subscriptions.length * limit > response.value.length) {
      return
    }

    const offset = (unwrappedFilters.offset ?? limit) * pages.value
    const subscriptionFilters = [{ ...unwrappedFilters, offset, limit }] as Parameters<T>
    const subscription = useSubscription<T>(action, subscriptionFilters, options)

    subscriptions.push(reactive(subscription))

    pages.value++
  }

  if (watchable !== null) {
    unwatch = uniqueValueWatcher(watchable, () => {
      if (!isSubscribed()) {
        unwatch!()
        return
      }

      pages.value = 0
      unsubscribe()
      subscriptions.splice(0)

      loadMore()
    }, { deep: true })
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      unsubscribe()

      if (unwatch) {
        unwatch()
      }
    })
  }

  return reactive({
    loading,
    executed,
    errored,
    error,
    response,
    unsubscribe,
    refresh,
    isSubscribed,
    loadMore,
  })

}