import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseTaskRun = UseEntitySubscription<WorkspaceTaskRunsApi['getTaskRun'], 'taskRun'>

export function useTaskRun(taskRunId: string | Ref<string | null | undefined>): UseTaskRun {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(taskRunId)

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.task_run) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRun, parameters)
  const taskRun = computed(() => subscription.response)

  return {
    subscription,
    taskRun,
  }
}