<template>
  <span v-if="isNumber(count)" class="results-count">
    {{ count.toLocaleString() }} {{ toPluralString(label, count) }}
  </span>
</template>

<script lang="ts" setup>
  import { toPluralString, isNumber } from '@/utilities'

  withDefaults(defineProps<{
    count: number | null | undefined,
    label?: string,
  }>(), {
    label: 'result',
  })
</script>

<style>
.results-count { @apply
  text-subdued
  text-base
  whitespace-nowrap
}
</style>