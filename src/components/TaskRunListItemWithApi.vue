<template>
  <TaskRunListItem v-if="taskRun" :selected="null" :task-run="taskRun" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import TaskRunListItem from '@/components/TaskRunListItem.vue'
  import { useWorkspaceApi } from '@/compositions'

  const props= defineProps<{
    taskRunId: string,
  }>()

  const api = useWorkspaceApi()
  const id = computed(()=> props.taskRunId)
  const taskRunSubscription = useSubscription(api.taskRuns.getTaskRun, [id])
  const taskRun = computed(()=> taskRunSubscription.response)
</script>


<style>
.task-run-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}
</style>