import { computed, Ref } from 'vue'
import { StateType } from '@/models'
import { mapper } from '@/services'
import { UnionFilters } from '@/types'

export type UseFlowRunFilterArgs = {
  flows?: Ref<string[]>,
  deployments?: Ref<string[]>,
  tags?: Ref<string[]>,
  states?: Ref<StateType[]>,
}

export function useFlowRunFilter(filters: UseFlowRunFilterArgs): Ref<UnionFilters> {
  return computed<UnionFilters>(() => {
    const response: UnionFilters = {}

    if (filters.flows?.value.length) {
      response.flows = {
        id: {
          any_: filters.flows.value,
        },
      }
    }

    if (filters.deployments?.value.length) {
      response.deployments = {
        id: {
          any_: filters.deployments.value,
        },
      }
    }

    if (filters.tags?.value.length) {
      response['flow_runs'] = {
        tags: {
          all_: filters.tags.value,
        },
      }
    }

    if (filters.states?.value.length) {
      // eslint-disable-next-line camelcase
      response.flow_runs = {
        state: {
          type: {
            any_: mapper.map('StateType', filters.states.value, 'ServerStateType'),
          },
        },
      }
    }

    return response
  })
}