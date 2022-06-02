<template>
  <span v-if="isNumber(count)" class="results-count">
    {{ count }} {{ toPluralString(label, count) }}
  </span>
</template>

<script lang="ts" setup>
  import { withDefaults } from 'vue'
  import { toPluralString } from '@/utilities'

  withDefaults(defineProps<{
    count: number | null | undefined,
    label?: string,
  }>(), {
    label: 'result',
  })

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