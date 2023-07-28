import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { computed, ComputedRef, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { TaskRunHistory } from '@/models'
import { useCan, useWorkspaceApi } from '@/compositions'
import { TaskRunsHistoryFilter } from '@/models/Filters'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { Getter } from '@/types/reactivity'

export type UseTaskRunsHistory = {
  history: ComputedRef<TaskRunHistory[]>,
  subscription: UseSubscription<WorkspaceTaskRunsApi['getTaskRunsHistory']>,
}


export function useTaskRunsHistory(filter: MaybeRefOrGetter<TaskRunsHistoryFilter | null | undefined>, options?: SubscriptionOptions): UseTaskRunsHistory {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[TaskRunsHistoryFilter] | null> = () => {
    if (!can.read.task_run) {
      return null
    }

    const filterValue = toValue(filter)

    if (!filterValue) {
      return null
    }

    // merge here is important to track changes to `filter` if it is a reactive
    const parameter = merge({}, filterValue)

    return [parameter]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsHistory, parameters, options)
  const history = computed(() => subscription.response ?? [])

  return {
    subscription,
    history,
  }
}