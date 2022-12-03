<template>
  <template v-for="taskRunId in activeSlots" :key="taskRunId">
    <TaskRunListItemWithApi v-if="taskRunId" :task-run-id="taskRunId" />
  </template>
</template>

<script lang="ts" setup>
  import TaskRunListItemWithApi from '@/components/TaskRunListItemWithApi.vue'

  defineProps<{
    activeSlots: string[],
  }>()
</script>


<style>
.task-run-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}
</style>