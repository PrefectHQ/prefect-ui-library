import { MaybeReadonly } from '@prefecthq/prefect-design'
import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { TaskRun, TaskRunsFilter } from '@/models'
import { WorkspaceTaskRunsApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseTaskRuns = {
  subscription: UseSubscription<WorkspaceTaskRunsApi['getTaskRuns']>,
  taskRuns: ComputedRef<TaskRun[]>,
}

export function useTaskRuns(filter?: MaybeRefOrGetter<MaybeReadonly<TaskRunsFilter> | null | undefined>, options?: PaginationOptions): UseTaskRuns {
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

  const parametersRef = toRef(parameters)
  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRuns, parametersRef, options)
  const taskRuns = computed(() => subscription.response ?? [])

  return {
    subscription,
    taskRuns,
  }
}