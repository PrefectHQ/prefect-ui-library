import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { ComputedRef, MaybeRefOrGetter, computed, toRef, toValue, watch, watchEffect } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { TaskRun, TaskRunsPaginationFilter } from '@/models'
import { WorkspaceTaskRunsApi } from '@/services'
import { Getter } from '@/types/reactivity'

type UsePaginatedTaskRuns = {
  subscription: UseSubscription<WorkspaceTaskRunsApi['getTaskRunsPaginated']>,
  taskRuns: ComputedRef<TaskRun[]>,
  count: ComputedRef<number>,
  limit: ComputedRef<number>,
  pages: ComputedRef<number>,
  page: ComputedRef<number>,
}

export function usePaginatedTaskRuns(filter: MaybeRefOrGetter<TaskRunsPaginationFilter | null | undefined> = {}, options?: SubscriptionOptions): UsePaginatedTaskRuns {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[TaskRunsPaginationFilter] | null> = () => {
    if (!can.read.task_run) {
      return null
    }

    const value = toValue(filter)

    if (!value) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    return [merge({}, value)]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsPaginated, parameters, options)

  const taskRuns = computed(() => subscription.response?.results ?? [])
  const pages = computed(() => subscription.response?.pages ?? 0)
  const limit = computed(() => subscription.response?.limit ?? 0)
  const count = computed(() => subscription.response?.count ?? 0)
  const page = computed(() => subscription.response?.page ?? 1)

  return {
    subscription,
    taskRuns,
    pages,
    page,
    limit,
    count,
  }
}