import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
import { useDebouncedRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { computed, Ref, ref } from 'vue'
import { useFlowRunFilter } from '@/compositions/useFlowRunFilter'
import { StateType } from '@/models/StateType'
import { FlowRunSortValues } from '@/types/SortOptionTypes'
import { UnionFilters } from '@/types/UnionFilters'

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
}

export function useFlowRunFilterFromRoute(): UseFlowRunFilterFromRoute {
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
  }
}

type UseFlowRunFilterFromParam = {

  states?: Ref<string[]>,
  deployments?: Ref<string[]>,
  workQueues?: string[],
  flows?: Ref<string[]>,
  filter: Ref<UnionFilters>,
}

// eslint-disable-next-line max-params
export function useFlowRunFilterFromParam(
  filterInputs: { states?: Ref<string[]>,
    deployments?: Ref<string[]>,
    workQueues?: string[],
    flows?: Ref<string[]>, }): UseFlowRunFilterFromParam {
  const sort = ref<'NAME_DESC' | 'NAME_ASC' | 'EXPECTED_START_TIME_DESC' | 'EXPECTED_START_TIME_ASC' | 'NEXT_SCHEDULED_START_TIME_ASC'>('EXPECTED_START_TIME_DESC')

  const startDate = ref<Date>(subDays(startOfToday(), 7))
  const endDate = ref<Date>(addDays(endOfToday(), 1))
  const deployments = filterInputs.deployments ? ref(filterInputs.deployments) : undefined
  const flows = filterInputs.flows ? ref(filterInputs.flows) : undefined
  const { states, workQueues } = filterInputs
  const filter = useFlowRunFilter({ states, deployments, workQueues, flows, startDate, endDate, sort })

  return {

    states,
    deployments,
    flows,
    workQueues,
    filter,
  }
}