import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { TaskRun } from '@/models/TaskRun'

export function useTaskRun(taskRunId: string | Ref<string | null | undefined>): ComputedRef<TaskRun | undefined> {
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

  return taskRun
}