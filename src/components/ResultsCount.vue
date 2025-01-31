<template>
  <span v-if="isNumber(count)" class="results-count">
    {{ count.toLocaleString() }}{{ isNumber(limit) ? ` / ${limit.toLocaleString()}` : '' }} {{ toPluralString(label, count) }}
  </span>
</template>

<script lang="ts" setup>
  import { toPluralString, isNumber } from '@/utilities'

  withDefaults(defineProps<{
    count: number | null | undefined,
    label?: string,
    limit?: number | null | undefined,
  }>(), {
    label: 'result',
    limit: undefined,
  })
</script>

<style>
.results-count { @apply
  text-subdued
  text-sm
  whitespace-nowrap
  font-mono
}
</style>