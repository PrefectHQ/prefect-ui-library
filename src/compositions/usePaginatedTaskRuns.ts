import { MaybeReadonly } from '@prefecthq/prefect-design'
import { MaybeRefOrGetter, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions, UsePaginationEntity, usePagination } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { TaskRunsFilter } from '@/models'
import { WorkspaceTaskRunsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UsePaginatedTaskRuns = UsePaginationEntity<
WorkspaceTaskRunsApi['getTaskRuns'],
WorkspaceTaskRunsApi['getTaskRunsCount'],
'taskRuns'
>

export function usePaginatedTaskRuns(filter?: MaybeRefOrGetter<MaybeReadonly<TaskRunsFilter> | null | undefined>, options?: PaginationOptions): UsePaginatedTaskRuns {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[TaskRunsFilter] | null> = () => {
    if (!can.read.task_run) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const pagination = usePagination({
    fetchMethod: api.taskRuns.getTaskRuns,
    fetchParameters: parameters,
    countMethod: api.taskRuns.getTaskRunsCount,
    countParameters: parameters,
    options,
  })

  return {
    ...pagination,
    taskRuns: pagination.results,
  }
}