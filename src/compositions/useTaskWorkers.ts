import { MaybeReadonly } from '@prefecthq/prefect-design'
import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { PaginationOptions } from '@/compositions/usePagination'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { TaskWorker, TaskWorkerFilter } from '@/models'
import { WorkspaceTaskWorkersApi } from '@/services'
import { Getter } from '@/types/reactivity'

export type UseTaskRuns = {
  subscription: UseSubscription<WorkspaceTaskWorkersApi['getTaskWorkers']>,
  workers: ComputedRef<TaskWorker[]>,
}

export function useTaskWorkers(filter?: MaybeRefOrGetter<MaybeReadonly<TaskWorkerFilter> | null | undefined>, options?: PaginationOptions): UseTaskRuns {
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters: Getter<[TaskWorkerFilter] | null> = () => {
    if (!can.read.workers) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [value]
  }

  const parametersRef = toRef(parameters)
  const subscription = useSubscriptionWithDependencies(api.taskWorkers.getTaskWorkers, parametersRef, options)
  const workers = computed(() => subscription.response ?? [])

  return {
    subscription,
    workers,
  }
}
