import { SubscriptionOptions, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { TaskRunsFilter } from '@/models/Filters'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseTaskRunsCount = UseEntitySubscription<WorkspaceTaskRunsApi['getTaskRunsCount'], 'count'>

export function useTaskRunsCount(filter: MaybeRefOrGetter<TaskRunsFilter | null | undefined>, options?: SubscriptionOptions): UseTaskRunsCount {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[TaskRunsFilter] | null> = () => {
    if (!can.read.task_run) {
      return null
    }

    const filterValue = toValue(filter)

    if (!filterValue) {
      return null
    }

    const base: TaskRunsFilter = {
      taskRuns: {
        subFlowRunsExist: false,
      },
    }

    // merge here is important to track changes to `filter` if it is a reactive
    const parameter = merge({}, base, filterValue)

    return [parameter]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsCount, parameters, options)
  const count = computed(() => subscription.response)

  return {
    subscription,
    count,
  }
}