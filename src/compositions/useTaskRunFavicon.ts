import { MaybeRefOrGetter, computed, toValue } from 'vue'
import { useFavicon } from '@/compositions/useFavicon'
import { TaskRun } from '@/models'

export function useTaskRunFavicon(taskRun: MaybeRefOrGetter<TaskRun | undefined>): void {
  const state = computed(() => {
    const taskRunValue = toValue(taskRun)
    return taskRunValue?.stateType
  })

  useFavicon(state)
}