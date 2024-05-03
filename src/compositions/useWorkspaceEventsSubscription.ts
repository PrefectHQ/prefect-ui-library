import { SubscriptionOptions, useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, reactive, ref, Ref, watch, MaybeRefOrGetter, toValue } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceEvent } from '@/models/workspaceEvent'
import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'

type UseWorkspaceEventsSubscription = {
  page: Ref<number>,
  pages: ComputedRef<number | undefined>,
  loading: ComputedRef<boolean>,
  events: ComputedRef<WorkspaceEvent[]>,
  empty: ComputedRef<boolean>,
  count: ComputedRef<number>,
}

export function useWorkspaceEventsSubscription(filter: MaybeRefOrGetter<WorkspaceEventsFilter>, options?: SubscriptionOptions): UseWorkspaceEventsSubscription {
  const page = ref<number>(1)
  const tokenVault = reactive<Record<number, string>>({})

  const api = useWorkspaceApi()

  const firstPageSubscriptionArgs = computed<[WorkspaceEventsFilter]>(() => {
    const filterValue = toValue(filter)
    return [filterValue]
  })

  const firstPageSubscription = useSubscription(api.events.getEvents, firstPageSubscriptionArgs, options)
  const firstPage = computed(() => firstPageSubscription.response)
  const pages = computed(() => firstPage.value?.pages)

  const nextPageSubscriptionArgs = computed<Parameters<typeof api.events.getNextPage> | null>(() => {
    if (page.value <= 1) {
      return null
    }

    return [tokenVault[page.value]]
  })
  const nextPageSubscription = useSubscriptionWithDependencies(api.events.getNextPage, nextPageSubscriptionArgs)
  const nextPage = computed(() => nextPageSubscription.response)

  const loading = computed(() => firstPageSubscription.loading || nextPageSubscription.loading)
  const events = computed(() => {
    if (page.value === 1) {
      return firstPage.value?.events ?? []
    }

    return nextPage.value?.events ?? []
  })

  const empty = computed(() => events.value.length === 0)
  const count = computed(() => firstPage.value?.total ?? 0)

  watch(firstPage, (firstPage) => {
    if (firstPage?.nextPageToken) {
      tokenVault[2] = firstPage.nextPageToken
    }
  })

  watch(nextPage, (nextPage) => {
    if (nextPage?.nextPageToken) {
      tokenVault[page.value + 1] = nextPage.nextPageToken
    }
  })

  return {
    page,
    pages,
    loading,
    events,
    empty,
    count,
  }
}