<template>
  <p-link :to="routes.taskRun(taskRunId)" class="task-run-icon-text">
    <p-icon-text icon="Task">
      <span>{{ taskRunName }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    taskRunId: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const taskRunSubscription = useSubscription(api.taskRuns.getTaskRun, [props.taskRunId])
  const taskRunName = computed(() => taskRunSubscription.response?.name)
</script>