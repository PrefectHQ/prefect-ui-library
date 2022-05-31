<template>
  <p-icon-text icon="ClockIcon" class="duration-icon-text">
    <span>{{ secondsToApproximateString(duration) }}</span>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { secondsToApproximateString } from '@/utilities/seconds'
  defineProps<{
    duration: number,
  }>()
</script>