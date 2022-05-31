<template>
  <span v-if="isNumber(count)" class="results-count">
    {{ count }} {{ toPluralString('result', count) }}
  </span>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@/utilities'

  defineProps<{
    count: number | null | undefined,
  }>()

  function isNumber(value: unknown): value is number {
    return typeof value === 'number'
  }
</script>

<style>
.results-count { @apply
  text-gray-500
  text-base
}
</style>