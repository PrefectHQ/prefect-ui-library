import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { TaskRunsFilter } from '@/models/Filters'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseTaskRunsCount = UseEntitySubscription<WorkspaceTaskRunsApi['getTaskRunsCount'], 'taskRunsCount'>

export function useTaskRunsCount(flowRunId: MaybeRefOrGetter<string | null | undefined>): UseTaskRunsCount {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[TaskRunsFilter] | null> = () => {
    if (!can.read.task_run) {
      return null
    }

    const id = toValue(flowRunId)

    if (!id) {
      return null
    }

    const filter: TaskRunsFilter = {
      flowRuns: {
        id: [id],
      },
      taskRuns: {
        subFlowRunsExist: false,
      },
    }

    return [filter]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsCount, parameters)
  const taskRunsCount = computed(() => subscription.response)

  return {
    subscription,
    taskRunsCount,
  }
}