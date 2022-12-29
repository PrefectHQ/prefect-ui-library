<template>
  <TaskRunList v-if="hasActiveSlots" :selected="null" :task-runs="activeRuns" disabled />
  <p-empty-results v-else>
    <template #message>
      No active task runs
    </template>
  </p-empty-results>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import TaskRunList from '@/components/TaskRunList.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { UnionFilters } from '@/models/api/UnionFilters'

  const props = defineProps<{
    activeSlots: string[],
  }>()

  const hasActiveSlots = computed(() => props.activeSlots.length)

  const concurrencyLimitTaskRunFilter = computed<UnionFilters>(() => {
    const runFilter: UnionFilters = {
      'task_runs': {
        id: {
          any_: props.activeSlots,
        },
      },
    }
    return runFilter
  })
  const api = useWorkspaceApi()
  const activeRunsSubscription = useSubscription(api.taskRuns.getTaskRuns, [concurrencyLimitTaskRunFilter])
  const activeRuns = computed(() => activeRunsSubscription.response ?? [])
</script>