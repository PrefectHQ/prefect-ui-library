import { Getter } from '@prefecthq/prefect-design'
import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, Ref, computed, ref, toValue, watch } from 'vue'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { repeat } from '@/utilities/arrays'

type PaginationFilter = {
  limit?: number,
  offset?: number,
}

type PaginationParameters = [filter?: PaginationFilter, ...any[]]
type PaginationFetchAction = (...parameters: PaginationParameters) => Promise<unknown[]>
type PaginationCountAction = (...parameters: PaginationParameters) => Promise<number>

type FetchSubscriptionAction<
  TFetch extends PaginationFetchAction
> = (parameters: Parameters<TFetch>[]) => Promise<Awaited<ReturnType<TFetch>>>

type PaginationMode = 'page' | 'infinite'

type PaginationFactoryParameters<
  TFetch extends PaginationFetchAction,
  TCount extends PaginationCountAction
> = {
  fetchMethod: TFetch,
  fetchParametersGetter: Getter<Parameters<TFetch>>,
  countMethod: TCount,
  countParametersGetter: Getter<Parameters<TCount>>,
  mode?: PaginationMode,
}

type ApiPaginationFactory<
  TFetch extends PaginationFetchAction,
  TCount extends PaginationCountAction
> = {
  subscriptions: UseSubscriptions<TCount | FetchSubscriptionAction<TFetch> | (() => undefined)>,
  results: ComputedRef<Awaited<ReturnType<TFetch>>>,
  total: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: Ref<number>,
  next: () => void,
  previous: () => void,
}

export function apiPaginationFactory<
  TFetch extends PaginationFetchAction,
  TCount extends PaginationCountAction
>({
  fetchMethod,
  fetchParametersGetter,
  countMethod,
  countParametersGetter,
  mode = 'page',
}: PaginationFactoryParameters<TFetch, TCount>): ApiPaginationFactory<TFetch, TCount> {

  type TFetchFilter = Parameters<TFetch>[0]

  const page = ref(mode === 'page' ? 1 : 0)
  const pages = computed(() => Math.ceil(total.value / getLimit()))

  const countSubscriptionParameters = computed(() => {
    if (page.value) {
      return toValue(countParametersGetter)
    }

    return null
  })
  const countSubscription = useSubscriptionWithDependencies(countMethod, countSubscriptionParameters)
  const total = computed(() => countSubscription.response ?? 0)

  async function fetchSubscriptionAction(parameters: Parameters<TFetch>[]): Promise<Awaited<ReturnType<TFetch>>> {
    const promises = parameters.map(parameters => useSubscription(fetchMethod, parameters).promise())
    const subscriptions = await Promise.all(promises)
    const response = subscriptions.flatMap(subscription => subscription.response)

    return response as Awaited<ReturnType<TFetch>>
  }

  const fetchSubscriptionParameters = ref(getFetchSubscriptionParameters()) as Ref<Parameters<TFetch>[]>
  const fetchSubscriptionDependantParameters = computed<null | [Parameters<TFetch>[]]>(() => {
    if (total.value === 0) {
      return null
    }

    return [fetchSubscriptionParameters.value]
  })
  const fetchSubscription = useSubscriptionWithDependencies(fetchSubscriptionAction, fetchSubscriptionDependantParameters)
  const results = computed(() => fetchSubscription.response ?? [] as unknown as Awaited<ReturnType<TFetch>>)

  const subscriptions = useSubscriptions([
    countSubscription,
    fetchSubscription,
  ])

  function next(): void {
    if (mode === 'page') {
      page.value++
    }

    const shouldLoadNextPage = page.value * getLimit() <= results.value.length

    if (shouldLoadNextPage) {
      page.value++
    }
  }

  function previous(): void {
    page.value--
  }

  function setFetchSubscriptionParameters(): void {
    fetchSubscriptionParameters.value = getFetchSubscriptionParameters()
  }

  function getFetchSubscriptionParameters(): Parameters<TFetch>[] {
    const [filter, ...rest] = toValue(fetchParametersGetter)
    const filters = getFetchParametersForPages(page.value, filter)

    return filters.map(filter => [filter, ...rest]) as unknown as Parameters<TFetch>[]
  }

  function getFetchParametersForPages(page: number, filter?: TFetchFilter): TFetchFilter[] {
    if (mode === 'page') {
      return [getFetchFilterForPage(page, filter)]
    }

    return repeat(page, page => getFetchFilterForPage(page, filter))
  }

  function getFetchFilterForPage(page: number, filter?: TFetchFilter): TFetchFilter {
    const limit = getLimit()

    return {
      ...filter,
      offset: limit * page,
      limit: limit,
    }
  }

  function getLimit(): number {
    const [filter] = toValue(fetchParametersGetter)
    const limit = filter?.limit ?? 200

    return limit
  }

  watch(fetchParametersGetter, () => {
    page.value = 1
  }, { deep: true })

  watch(page, () => {
    setFetchSubscriptionParameters()
  })

  return {
    subscriptions,
    results,
    total,
    page,
    pages,
    next,
    previous,
  }
}