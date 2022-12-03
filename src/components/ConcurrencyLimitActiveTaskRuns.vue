<template>
  <template v-for="taskRunId in activeSlots" :key="taskRunId">
    <TaskRunListItemWithApi v-if="taskRunId" :task-run-id="taskRunId" class="task-run-list-item" />
  </template>
</template>

<script lang="ts" setup>
  import TaskRunListItemWithApi from '@/components/TaskRunListItemWithApi.vue'

  defineProps<{
    activeSlots: string[],
  }>()
</script>


<style>
.task-run-list-item {
  @apply
  mt-2
}
</style>