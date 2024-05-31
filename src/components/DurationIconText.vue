<template>
  <p-icon-text icon="ClockIcon" class="duration-icon-text">
    <span class="duration-icon-text__label" :class="classes.label">{{ label }}</span>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { secondsToApproximateString } from '@/utilities/seconds'

  const props = defineProps<{
    duration: number,
  }>()

  const label = computed(() => props.duration == 0 ? 'None' : secondsToApproximateString(props.duration))

  const classes = computed(() => ({
    label: {
      'duration-icon-text__label--none': props.duration === 0,
    },
  }))
</script>

<style>
.duration-icon-text__label--none { @apply
  text-subdued
}
</style>