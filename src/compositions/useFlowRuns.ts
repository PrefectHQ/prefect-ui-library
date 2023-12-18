import { MaybeReadonly } from '@prefecthq/prefect-design'
import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { FlowRunsFilter } from '@/models'
import { WorkspaceFlowRunsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseFlowRuns = UsePaginationEntity<
WorkspaceFlowRunsApi['getFlowRuns'],
WorkspaceFlowRunsApi['getFlowRunsCount'],
'flowRuns'
>

export function useFlowRuns(filter?: MaybeRefOrGetter<MaybeReadonly<FlowRunsFilter> | null | undefined>, options?: PaginationOptions): UseFlowRuns {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[FlowRunsFilter] | null> = () => {
    if (!can.read.flow_run) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const pagination = usePagination({
    fetchMethod: api.flowRuns.getFlowRuns,
    fetchParameters: parameters,
    countMethod: api.flowRuns.getFlowRunsCount,
    countParameters: parameters,
    options,
  })

  return {
    ...pagination,
    flowRuns: pagination.results,
  }
}