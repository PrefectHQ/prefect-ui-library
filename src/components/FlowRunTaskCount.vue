<template>
  <p-icon-text icon="Task" class="flow-run-task-count">
    {{ label }}
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    tasksCount: number | undefined,
  }>()

  const label = computed(() => {
    return props.tasksCount && props.tasksCount > 0
      ? `${props.tasksCount} task ${toPluralString('run', props.tasksCount)}`
      : 'None'
  })
</script>