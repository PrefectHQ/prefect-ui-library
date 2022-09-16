import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'

/* eslint-disable camelcase */
import { computed, ref, Ref } from 'vue'
import { isStateType } from '@/models'
import { mapper } from '@/services'
import { FlowRunSortValues, StateFilter, UnionFilters } from '@/types'
import { capitalize } from '@/utilities'

export type UseFlowRunFilterArgs = {
  flows?: Ref<string[]> | string[],
  deployments?: Ref<string[]> | string[],
  tags?: Ref<string[]> | string[],
  states?: Ref<string[]> | string[],
  startDate?: Ref<Date> | Date,
  endDate?: Ref<Date> | Date,
  sort?: Ref<FlowRunSortValues> | FlowRunSortValues,
  name?: Ref<string> | string,
  workQueues?: Ref<string[]> | string[],
}

export function useFlowRunFilter(filters: UseFlowRunFilterArgs): Ref<UnionFilters> {

  const flows = ref(filters.flows)
  const deployments = ref(filters.deployments)
  const tags = ref(filters.tags)
  const states = ref(filters.states)
  const startDate = ref(filters.startDate)
  const endDate = ref(filters.endDate)
  const sort = ref(filters.sort)
  const name = ref(filters.name)
  const workQueues = ref(filters.workQueues)

  return computed<UnionFilters>(() => {
    const response: UnionFilters = {}
    if (flows.value?.length) {
      response.flows ??= {}
      response.flows.id ??= {}

      response.flows.id.any_ = flows.value
    }

    if (deployments.value?.length) {
      response.deployments ??= {}
      response.deployments.id ??= {}

      response.deployments.id.any_ = deployments.value
    }

    if (tags.value?.length) {
      response.flow_runs ??= {}
      response.flow_runs.tags ??= {}

      response.flow_runs.tags.all_ = tags.value
    }

    if (states.value?.length) {
      const stateFilter: StateFilter = { operator: 'or_' }

      states.value.forEach(state => {
        if (isStateType(state)) {
          stateFilter.type ??= {}
          stateFilter.type.any_ ??= []
          stateFilter.type.any_.push(mapper.map('StateType', state, 'ServerStateType'))
        } else {
          const capitalizedState = capitalize(state)
          stateFilter.name ??= {}
          stateFilter.name.any_ ??= []
          stateFilter.name.any_.push(capitalizedState)
        }
      })

      response.flow_runs ??= {}
      response.flow_runs.state = stateFilter
    }

    if (startDate.value) {
      response.flow_runs ??= {}
      response.flow_runs.expected_start_time ??= {}

      response.flow_runs.expected_start_time.after_ = mapper.map('Date', startDate.value, 'string')
    }

    if (endDate.value) {
      response.flow_runs ??= {}
      response.flow_runs.expected_start_time ??= {}

      response.flow_runs.expected_start_time.before_ = mapper.map('Date', endDate.value, 'string')
    }

    if (sort.value) {
      response.sort = sort.value
    }

    if (name.value) {
      response.flow_runs ??= {}
      response.flow_runs.name ??= {}

      response.flow_runs.name.any_ = [name.value]
    }

    if (workQueues.value?.length) {
      response.flow_runs ??= {}
      response.flow_runs.work_queue_name??= {}

      response.flow_runs.work_queue_name.any_ = workQueues.value
    }

    return response
  })
}

export type UseRecentFlowRunFilterArgs = Omit<UseFlowRunFilterArgs, 'startDate' | 'endDate'>

export function useRecentFlowRunFilter(filters: UseRecentFlowRunFilterArgs): Ref<UnionFilters> {
  const refs = { ...filters }
  const startDate = ref<Date>(subDays(startOfToday(), 7))
  const endDate = ref<Date>(addDays(endOfToday(), 1))

  refs.sort ??= ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')

  return useFlowRunFilter({ startDate, endDate, ...refs })
}