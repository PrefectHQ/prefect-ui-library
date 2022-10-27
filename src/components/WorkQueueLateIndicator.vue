<template>
  <p-tag v-if="lateRunsCount" class="work-queue-late-indicator">
    {{ tagText }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    lateRunsCount: number,
  }>()

  const tagText = computed(() => {
    if (props.lateRunsCount === 1) {
      return `${props.lateRunsCount} Late run`
    }
    return `${props.lateRunsCount} Late runs`
  })
</script>

<style>
.work-queue-late-indicator { @apply
  text-xs
  bg-state-scheduled-100
  text-state-scheduled-700
  }
</style>