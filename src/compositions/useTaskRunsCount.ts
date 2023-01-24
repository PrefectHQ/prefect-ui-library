/* eslint-disable camelcase */
import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useCan, useWorkspaceApi } from '@/compositions'

export function useTaskRunsCount(flowRunId: string | Ref<string | null | undefined>): ComputedRef<number | undefined> {
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

  const taskRunsCountSubscription = useSubscriptionWithDependencies(api.taskRuns.getTaskRunsCount, tasksCountFilter)
  const taskRunsCount = computed(() => taskRunsCountSubscription.response)

  return taskRunsCount
}