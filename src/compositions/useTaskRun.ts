import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseTaskRun = UseEntitySubscription<WorkspaceTaskRunsApi['getTaskRun'], 'taskRun'>

export function useTaskRun(taskRunId: MaybeRefOrGetter<string | null | undefined>): UseTaskRun {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.task_run) {
      return null
    }

    const id = toValue(taskRunId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRun, parameters)
  const taskRun = computed(() => subscription.response)

  return {
    subscription,
    taskRun,
  }
}