/* eslint-disable camelcase */
import { computed, Ref } from 'vue'
import { isStateType } from '@/models'
import { mapper } from '@/services'
import { FlowRunSortValues, StateFilter, UnionFilters } from '@/types'

export type UseFlowRunFilterArgs = {
  flows?: Ref<string[]>,
  deployments?: Ref<string[]>,
  tags?: Ref<string[]>,
  states?: Ref<string[]>,
  startDate?: Ref<Date>,
  endDate?: Ref<Date>,
  sort?: Ref<FlowRunSortValues>,
  name?: Ref<string>,
}

export function useFlowRunFilter(filters: UseFlowRunFilterArgs): Ref<UnionFilters> {
  return computed<UnionFilters>(() => {
    const response: UnionFilters = {}

    if (filters.flows?.value.length) {
      response.flows ??= {}
      response.flows.id ??= {}

      response.flows.id.any_ = filters.flows.value
    }

    if (filters.deployments?.value.length) {
      response.deployments ??= {}
      response.deployments.id ??= {}

      response.deployments.id.any_ = filters.deployments.value
    }

    if (filters.tags?.value.length) {
      response.flow_runs ??= {}
      response.flow_runs.tags ??= {}

      response.flow_runs.tags.all_ = filters.tags.value
    }

    if (filters.states?.value.length) {
      const stateFilter: StateFilter = { operator: 'or_' }

      filters.states.value.forEach(state => {
        if (isStateType(state)) {
          stateFilter.type ??= {}
          stateFilter.type.any_ ??= []
          stateFilter.type.any_.push(mapper.map('StateType', state, 'ServerStateType'))
        } else {
          stateFilter.name ??= {}
          stateFilter.name.any_ ??= []
          stateFilter.name.any_.push(state)
        }
      })

      response.flow_runs ??= {}
      response.flow_runs.state = stateFilter
    }

    if (filters.startDate?.value) {
      response.flow_runs ??= {}
      response.flow_runs.expected_start_time ??= {}

      response.flow_runs.expected_start_time.after_ = mapper.map('Date', filters.startDate.value, 'string')
    }

    if (filters.endDate?.value) {
      response.flow_runs ??= {}
      response.flow_runs.expected_start_time ??= {}

      response.flow_runs.expected_start_time.before_ = mapper.map('Date', filters.endDate.value, 'string')
    }

    if (filters.sort?.value) {
      response.sort = filters.sort.value
    }

    if (filters.name?.value) {
      response.flow_runs ??= {}
      response.flow_runs.name ??= {}

      response.flow_runs.name.any_ = [filters.name.value]
    }

    return response
  })
}