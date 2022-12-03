<template>
  <template v-if="!taskRunCount">
    None
  </template>
  <template v-else>
    {{ taskRunCount }}
  </template>
</template>

  <script lang="ts" setup>
  import { computed } from 'vue'
  import { ConcurrencyLimit } from '@/models'

  const props = defineProps<{
    concurrencyLimit: ConcurrencyLimit,
  }>()

  const taskRunCount = computed(()=> props.concurrencyLimit.activeSlots?.length)
  </script>
