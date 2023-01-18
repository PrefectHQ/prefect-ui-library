<template>
  <span v-if="isNumber(count)" class="results-count">
    {{ count }} {{ toPluralString(label, count) }}
  </span>
</template>

<script lang="ts" setup>
  import { withDefaults } from 'vue'
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
  text-foreground-300
  text-base
}
</style>