<template>
  <p-tag v-if="lateRunsCount" class="work-queue-late-indicator">
    {{ lateRunsCount }} {{ toPluralString('Late run', lateRunsCount) }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@/utilities'

  defineProps<{
    lateRunsCount: number,
  }>()
</script>

<style>
.work-queue-late-indicator { @apply
  text-xs
  bg-state-scheduled-100
  text-state-scheduled-700
  }
</style>