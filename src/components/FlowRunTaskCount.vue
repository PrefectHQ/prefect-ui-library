<template>
  <p-icon-text v-if="tasksCount" icon="Task" class="flow-run-task-count">
    <slot v-bind="{ count }">
      {{ label }}
    </slot>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    tasksCount: number | undefined,
  }>()

  const count = computed(() => props.tasksCount)

  const label = computed(() => !count.value || count.value == 0 ? 'None' : count.value)
</script>