<template>
  <p-icon-text icon="ClockIcon" class="duration-icon-text">
    <span>{{ label }}</span>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { secondsToApproximateString } from '@/utilities/seconds'

  const props = defineProps<{
    duration: number | null,
  }>()

  const label = computed(() => props.duration == null ? 'None' : secondsToApproximateString(props.duration))
</script>