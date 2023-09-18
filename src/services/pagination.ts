import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, Ref, computed, ref, toValue, watch } from 'vue'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { repeat } from '@/utilities/arrays'

type PaginationFilter = {
  limit?: number,
  offset?: number,
}

type PaginationParameters<
  TFilter extends PaginationFilter
> = [filter?: TFilter, ...any[]]

type PaginationFetchAction<
  TFilter extends PaginationFilter,
  TResponse extends unknown[]
> = (...parameters: PaginationParameters<TFilter>) => Promise<TResponse>

type FetchSubscriptionAction<
  TFilter extends PaginationFilter,
  TResponse extends unknown[]
> = (parameters: PaginationParameters<TFilter>[]) => Promise<TResponse>

type PaginationCountAction<
  TFilter extends PaginationFilter
> = (...parameters: PaginationParameters<TFilter>) => Promise<number>

type ParametersGetter<
  TFilter extends PaginationFilter
> = () => PaginationParameters<TFilter>

type PaginationMode = 'page' | 'infinite'

type PaginationFactoryParameters<
  TResponse extends unknown[],
  TFilter extends PaginationFilter
> = {
  fetchMethod: PaginationFetchAction<TFilter, TResponse>,
  fetchParametersGetter: ParametersGetter<TFilter>,
  countMethod: PaginationCountAction<TFilter>,
  countParametersGetter: ParametersGetter<TFilter>,
  mode?: PaginationMode,
}

  type ApiPaginationFactory<
    TResponse extends unknown[],
    TFilter extends PaginationFilter
  > = {
    subscriptions: UseSubscriptions<PaginationCountAction<TFilter> | FetchSubscriptionAction<TFilter, TResponse>>,
    results: ComputedRef<TResponse>,
    total: ComputedRef<number>,
    pages: ComputedRef<number>,
    page: Ref<number>,
    next: () => void,
    previous: () => void,
  }

export function apiPaginationFactory<
  TResponse extends unknown[],
  TFilter extends PaginationFilter
>({
  fetchMethod,
  fetchParametersGetter,
  countMethod,
  countParametersGetter,
  mode = 'page',
}: PaginationFactoryParameters<TResponse, TFilter>): ApiPaginationFactory<TResponse, TFilter> {
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

  async function fetchSubscriptionAction(parameters: PaginationParameters<TFilter>[]): Promise<TResponse> {
    const promises = parameters.map(parameters => useSubscription(fetchMethod, parameters).promise())
    const subscriptions = await Promise.all(promises)
    const response = subscriptions.flatMap(subscription => subscription.response)

    return response as unknown as TResponse
  }

  const fetchSubscriptionParameters = ref(getFetchSubscriptionParameters()) as Ref<PaginationParameters<TFilter>[]>
  const fetchSubscriptionDependantParameters = computed<null | [PaginationParameters<TFilter>[]]>(() => {
    if (total.value === 0) {
      return null
    }

    return [fetchSubscriptionParameters.value]
  })
  const fetchSubscription = useSubscriptionWithDependencies(fetchSubscriptionAction, fetchSubscriptionDependantParameters)
  const results = computed(() => fetchSubscription.response ?? [] as unknown as TResponse)

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

  function getFetchSubscriptionParameters(): PaginationParameters<TFilter>[] {
    const [filter, ...rest] = toValue(fetchParametersGetter)
    const filters = getFetchParametersForPages(page.value, filter)

    return filters.map(filter => [filter, ...rest])
  }

  function getFetchParametersForPages(page: number, filter?: TFilter): TFilter[] {
    if (mode === 'page') {
      return [getFetchFilterForPage(page, filter)]
    }

    return repeat(page, page => getFetchFilterForPage(page, filter))
  }

  function getFetchFilterForPage(page: number, filter?: TFilter): TFilter {
    const limit = getLimit()

    return {
      ...filter,
      offset: limit * page,
      limit: limit,
    } as TFilter
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