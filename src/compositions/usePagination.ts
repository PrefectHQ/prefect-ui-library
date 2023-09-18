import { Getter } from '@prefecthq/prefect-design'
import { SubscriptionOptions, useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, Ref, computed, ref, watch } from 'vue'
import { GLOBAL_API_LIMIT } from '@/compositions/useFilterPagination'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { repeat } from '@/utilities/arrays'

type PaginationFilter = {
  limit?: number,
  offset?: number,
}

// typescript only lets you use any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PaginationParameters = [filter?: PaginationFilter, ...any[]]
type PaginationFetchAction = (...parameters: PaginationParameters) => Promise<unknown[]>
type PaginationCountAction = (...parameters: PaginationParameters) => Promise<number>

type FetchSubscriptionAction<
  TFetch extends PaginationFetchAction
> = (parameters: Parameters<TFetch>[]) => Promise<Awaited<ReturnType<TFetch>>>

export type PaginationOptions = SubscriptionOptions & {
  mode: 'page' | 'infinite',
}

export type UsePaginationParameters<
  TFetch extends PaginationFetchAction,
  TFetchParameters extends Getter<Parameters<TFetch> | null>,
  TCount extends PaginationCountAction,
  TCountParameters extends Getter<Parameters<TCount> | null>
> = {
  fetchMethod: TFetch,
  fetchParameters: TFetchParameters,
  countMethod: TCount,
  countParameters: TCountParameters,
  options?: PaginationOptions,
}

export type UsePaginationEntity<
  TFetch extends PaginationFetchAction,
  TCount extends PaginationCountAction,
  TProperty extends string
> = Omit<UsePagination<TFetch, TCount>, 'results'> & {
  [ P in TProperty ]: ComputedRef<Awaited<ReturnType<TFetch>>>
}

export type UsePagination<
  TFetch extends PaginationFetchAction,
  TCount extends PaginationCountAction
> = {
  subscriptions: UseSubscriptions<TCount | FetchSubscriptionAction<TFetch> | (() => undefined)>['subscriptions'],
  results: ComputedRef<Awaited<ReturnType<TFetch>>>,
  total: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: Ref<number>,
  next: () => void,
  previous: () => void,
}

export function usePagination<
  TFetch extends PaginationFetchAction,
  TFetchParameters extends Getter<Parameters<TFetch> | null>,
  TCount extends PaginationCountAction,
  TCountParameters extends Getter<Parameters<TCount> | null>
>({
  fetchMethod,
  fetchParameters: fetchParametersGetter,
  countMethod,
  countParameters: countParametersGetter,
  options,
}: UsePaginationParameters<TFetch, TFetchParameters, TCount, TCountParameters>): UsePagination<TFetch, TCount> {

  type TFetchFilter = Parameters<TFetch>[0]

  const mode = options?.mode ?? 'page'
  const page = ref(mode === 'page' ? 1 : 0)
  const pages = computed(() => Math.ceil(total.value / getLimit()))

  const countSubscriptionParameters = computed(() => {
    if (page.value) {
      return countParametersGetter()
    }

    return null
  })
  const countSubscription = useSubscriptionWithDependencies(countMethod, countSubscriptionParameters, options)
  const total = computed(() => countSubscription.response ?? 0)

  async function fetchSubscriptionAction(parameters: Parameters<TFetch>[]): Promise<Awaited<ReturnType<TFetch>>> {
    const promises = parameters.map(parameters => useSubscription(fetchMethod, parameters).promise())
    const subscriptions = await Promise.all(promises)
    const response = subscriptions.flatMap(subscription => subscription.response)

    return response as Awaited<ReturnType<TFetch>>
  }

  const fetchSubscriptionParameters = ref(getFetchSubscriptionParameters()) as Ref<Parameters<TFetch>[] | null>
  const fetchSubscriptionDependantParameters = computed<null | [Parameters<TFetch>[]]>(() => {
    if (total.value === 0 || fetchSubscriptionParameters.value === null) {
      return null
    }

    return [fetchSubscriptionParameters.value]
  })
  const fetchSubscription = useSubscriptionWithDependencies(fetchSubscriptionAction, fetchSubscriptionDependantParameters, options)
  const results = computed(() => fetchSubscription.response ?? [] as unknown as Awaited<ReturnType<TFetch>>)

  const { subscriptions } = useSubscriptions([
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

  function getFetchSubscriptionParameters(): Parameters<TFetch>[] | null {
    const parameters = fetchParametersGetter()

    if (parameters === null) {
      return null
    }

    const [filter, ...rest] = parameters
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
    const [filter] = fetchParametersGetter() ?? []
    const limit = filter?.limit ?? GLOBAL_API_LIMIT

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