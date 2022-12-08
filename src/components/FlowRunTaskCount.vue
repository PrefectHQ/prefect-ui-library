<template>
  <p-icon-text icon="Task" class="flow-run-task-count">
    {{ count }}
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    tasksCount: number | null | undefined,
  }>()

  const count = computed(() => !props.tasksCount || props.tasksCount == 0 ? 'None' : props.tasksCount)
</script>