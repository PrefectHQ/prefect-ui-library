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

  const props = defineProps<{
    activeSlots: string[],
  }>()

  const taskRunCount = computed(() => props.activeSlots.length)
</script>
