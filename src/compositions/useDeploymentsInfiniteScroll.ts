import { SubscriptionOptions, UseSubscription, useSubscription } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, onUnmounted, reactive, ref, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { GLOBAL_API_LIMIT, useFilterPagination } from '@/compositions/useFilterPagination'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Deployment } from '@/models/Deployment'
import { DeploymentsFilter } from '@/models/Filters'
import { WorkspaceDeploymentsApi } from '@/services/WorkspaceDeploymentsApi'
import { uniqueValueWatcher, getValidWatchSource } from '@/utilities/reactivity'

type DeploymentsAction = WorkspaceDeploymentsApi['getDeployments'] | (() => undefined)

export type UseDeploymentsInfiniteScroll = {
  deployments: ComputedRef<Deployment[]>,
  subscriptions: UseSubscriptions<DeploymentsAction>['subscriptions'],
  loadMore: () => void,
}

export function useDeploymentsInfiniteScroll(filter?: MaybeRefOrGetter<DeploymentsFilter | null | undefined>, options?: SubscriptionOptions): UseDeploymentsInfiniteScroll {
  const filterRef = computed(() => toValue(filter))
  const can = useCan()
  const api = useWorkspaceApi()
  const page = ref(0)
  const pages = reactive<UseSubscription<DeploymentsAction>[]>([])
  const pageLimit = computed(() => filterRef.value?.limit ?? 5)

  const deployments = computed(() => pages.flatMap(page => page.response ?? []))
  const { subscriptions } = useSubscriptions(pages)

  function canLoadMore(): boolean {
    const loadedMaxPages = pages.length * pageLimit.value > deployments.value.length

    return !loadedMaxPages && !!can.read.deployment
  }

  function loadMore(): void {
    if (!canLoadMore()) {
      return
    }

    page.value++

    const { limit, offset } = useFilterPagination(page.value, pageLimit.value)

    const filter: DeploymentsFilter = {
      ...filterRef.value,
      limit: limit.value,
      offset: offset.value,
    }

    const subscription = useSubscription(api.deployments.getDeployments, [filter], options)

    pages.push(subscription)
  }

  const unwatch = uniqueValueWatcher(getValidWatchSource(filterRef), () => {
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

  return {
    deployments,
    subscriptions,
    loadMore,
  }
}