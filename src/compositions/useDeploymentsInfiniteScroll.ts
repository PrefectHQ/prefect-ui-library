import { SubscriptionOptions, UseSubscription, useSubscription } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, ref, toValue, watch } from 'vue'
import { useCan } from '@/compositions/useCan'
import { GLOBAL_API_LIMIT } from '@/compositions/useFilterPagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { Deployment } from '@/models/Deployment'
import { DeploymentsFilter } from '@/models/Filters'
import { repeat } from '@/utilities/arrays'

export type UseDeploymentsInfiniteScroll = {
  deployments: ComputedRef<Deployment[]>,
  subscription: UseSubscription<() => Promise<Deployment[]>>,
  more: () => void,
}

export function useDeploymentsInfiniteScroll(filter?: MaybeRefOrGetter<DeploymentsFilter | null | undefined>, options?: SubscriptionOptions): UseDeploymentsInfiniteScroll {
  const api = useWorkspaceApi()
  const can = useCan()
  const page = ref(0)
  const limit = computed(() => toValue(filter)?.limit ?? GLOBAL_API_LIMIT)
  const filters = ref<DeploymentsFilter[]>()

  async function action(filters?: DeploymentsFilter[]): Promise<Deployment[]> {
    if (!filters) {
      return []
    }

    const promises = filters.map(filter => useSubscription(api.deployments.getDeployments, [filter], options).promise())
    const subscriptions = await Promise.all(promises)
    const deployments = subscriptions.flatMap(subscription => subscription.response)

    return deployments
  }

  const subscription = useSubscription(action, [filters], options)
  const deployments = computed(() => subscription.response ?? [])

  function canLoadMore(): boolean {
    const loadedMaxPages = page.value * limit.value > deployments.value.length

    return !loadedMaxPages && !!can.read.deployment
  }

  function more(): void {
    if (!canLoadMore()) {
      return
    }

    page.value++

    filters.value = repeat(page.value, index => ({
      ...toValue(filter),
      offset: limit.value * index,
      limit: limit.value,
    }))
  }

  watch(() => toValue(filter), () => {
    page.value = 0
    more()
  }, { deep: true })

  return {
    deployments,
    subscription,
    more,
  }
}