import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, Ref, ref } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'
import { WorkspaceTaskRunsApi } from '@/services/WorkspaceTaskRunsApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseTaskRunsCount = UseEntitySubscription<WorkspaceTaskRunsApi['getTaskRunsCount'], 'taskRunsCount'>

export function useTaskRunsCount(flowRunId: string | Ref<string | null | undefined>): UseTaskRunsCount {
  const api = useWorkspaceApi()
  const can = useCan()
  const id = ref(flowRunId)

  const tasksCountFilter = computed<Parameters<typeof api.taskRuns.getTaskRunsCount> | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.task_run) {
      return null
    }

    return [
      {
        flowRuns: {
          id: [id.value],
        },
        taskRuns: {
          subFlowRunsExist: false,
        },
      },
    ]
  })

  const subscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsCount, tasksCountFilter)
  const taskRunsCount = computed(() => subscription.response)

  return {
    subscription,
    taskRunsCount,
  }
}