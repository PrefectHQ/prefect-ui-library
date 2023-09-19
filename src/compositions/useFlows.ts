import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowsFilter } from '@/models'
import { WorkspaceFlowsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseFlows = UsePaginationEntity<
WorkspaceFlowsApi['getFlows'],
WorkspaceFlowsApi['getFlowsCount'],
'flows'
>

export function useFlows(filter?: MaybeRefOrGetter<FlowsFilter | null | undefined>, options?: PaginationOptions): UseFlows {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[FlowsFilter?] | null> = () => {
    if (!can.read.flow) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const pagination = usePagination({
    fetchMethod: api.flows.getFlows,
    fetchParameters: parameters,
    countMethod: api.flows.getFlowsCount,
    countParameters: parameters,
    options,
  })

  return {
    ...pagination,
    flows: pagination.results,
  }
}