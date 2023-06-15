<template>
  <TaskRunList v-if="hasActiveSlots" :task-runs="activeRuns" />
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
  import { TaskRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    activeSlots: string[],
  }>()

  const hasActiveSlots = computed(() => props.activeSlots.length)

  const concurrencyLimitTaskRunFilter = computed<TaskRunsFilter>(() => ({
    taskRuns: {
      id: props.activeSlots,
    },
  }))
  const api = useWorkspaceApi()
  const activeRunsSubscription = useSubscription(api.taskRuns.getTaskRuns, [concurrencyLimitTaskRunFilter])
  const activeRuns = computed(() => activeRunsSubscription.response ?? [])
</script>