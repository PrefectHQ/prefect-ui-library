<template>
  <p-icon-text icon="Task" class="flow-run-task-count">
    {{ label }}
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    tasksCount: number,
  }>()

  const label = computed(() => props.tasksCount == 0 ? 'None' : props.tasksCount)
</script>