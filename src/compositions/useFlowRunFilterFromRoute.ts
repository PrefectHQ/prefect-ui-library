import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
import { useDebouncedRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { computed, reactive, Ref } from 'vue'
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
import { useFlowRunFilter, UseFlowRunFilterArgs } from '@/compositions/useFlowRunFilter'
import { StateType } from '@/models/StateType'
import { FlowRunSortValues } from '@/types/SortOptionTypes'
import { UnionFilters } from '@/types/UnionFilters'
import { asArray, isSame } from '@/utilities/arrays'

type UseFlowRunFilterFromRoute = {
  name: Ref<string>,
  sort: Ref<FlowRunSortValues>,
  startDate: Ref<Date>,
  endDate: Ref<Date>,
  states: Ref<StateType[]>,
  deployments: Ref<string[]>,
  flows: Ref<string[]>,
  tags: Ref<string[]>,
  filter: Ref<UnionFilters>,
  hasFilters: Ref<boolean>,
  setFilters: (filters: UseFlowRunFilterArgs) => Promise<void>,
}

type FlowRunFiltersInRoute = {
  'name': string,
  'sort': string,
  'start-date': string,
  'end-date': string,
  'state': string[],
  'deployment': string[],
  'flow': string[],
  'tag': string[],
}

export function useFlowRunFilterFromRoute(): UseFlowRunFilterFromRoute {
  const route = useRoute()
  const router = useRouter()

  const name = useRouteQueryParam('name', '')
  const sort = useRouteQueryParam('sort', 'EXPECTED_START_TIME_DESC') as Ref<FlowRunSortValues>

  const defaultStartDate = formatDateTimeNumeric(subDays(startOfToday(), 7))
  const startDateParam = useRouteQueryParam('start-date', defaultStartDate)

  const startDate = computed({
    get() {
      return parseDateTimeNumeric(startDateParam.value)
    },
    set(value: Date) {
      startDateParam.value = formatDateTimeNumeric(value)
    },
  })

  const defaultEndDate = formatDateTimeNumeric(addDays(endOfToday(), 1))
  const endDateParam = useRouteQueryParam('end-date', defaultEndDate)

  const endDate = computed({
    get() {
      return parseDateTimeNumeric(endDateParam.value)
    },
    set(value: Date) {
      endDateParam.value = formatDateTimeNumeric(value)
    },
  })

  const nameDebounced = useDebouncedRef(name, 1200)

  const states = useRouteQueryParam('state', []) as Ref<StateType[]>
  const deployments = useRouteQueryParam('deployment', [])
  const flows = useRouteQueryParam('flow', [])
  const tags = useRouteQueryParam('tag', [])

  const filter = useFlowRunFilter({ states, deployments, flows, tags, startDate, endDate, sort, name: nameDebounced })

  const hasFilters = computed(() => {
    return !!states.value.length ||
      !!deployments.value.length ||
      !!flows.value.length ||
      !!tags.value.length ||
      startDateParam.value !== defaultStartDate ||
      endDateParam.value !== defaultEndDate
  })

  async function setFilters(filters: UseFlowRunFilterArgs): Promise<void> {
    const values = reactive(filters)
    const query = {} as Partial<FlowRunFiltersInRoute>

    if (values.name && values.name !== getRouteQueryParam(route, 'name')) {
      query.name = values.name
    }

    if (values.sort && values.sort !== getRouteQueryParam(route, 'sort')) {
      query.sort = values.sort
    }

    if (values.startDate) {
      const formatted = formatDateTimeNumeric(values.startDate)

      if (formatted !== getRouteQueryParam(route, 'start-date') && formatted !== defaultStartDate) {
        query['start-date'] = formatted
      }
    }

    if (values.endDate) {
      const formatted = formatDateTimeNumeric(values.endDate)

      if (formatted !== getRouteQueryParam(route, 'end-date') && formatted !== defaultEndDate) {
        query['end-date'] = formatted
      }
    }

    if (values.states && !isSame(values.states, asArray(getRouteQueryParam(route, 'states')))) {
      query.state = values.states
    }

    if (values.deployments && !isSame(values.deployments, asArray(getRouteQueryParam(route, 'deployments')))) {
      query.deployment = values.deployments
    }

    if (values.flows && !isSame(values.flows, asArray(getRouteQueryParam(route, 'flows')))) {
      query.flow = values.flows
    }

    if (values.tags && !isSame(values.tags, asArray(getRouteQueryParam(route, 'tags')))) {
      query.tag = values.tags
    }

    await router.push({ query })
  }

  return {
    name,
    sort,
    startDate,
    endDate,
    states,
    deployments,
    flows,
    tags,
    filter,
    hasFilters,
    setFilters,
  }
}

function getRouteQueryParam({ query }: RouteLocationNormalized, param: string): string | null | string[] {
  return query[param] as string | null | string[]
}