<template v-if="status">
  <p-tooltip
    :text="tooltipText"
  >
    <div v-if="status !== 'paused'" class="work-pool-status-icon" :class="classes" />
    <p-icon
      v-if="status === 'paused'"
      icon="PauseCircleIcon"
      size="small"
      class="work-pool-status-icon--paused"
    />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { WorkPoolStatus } from '@/models'

  const props = defineProps<{
    status: WorkPoolStatus,
  }>()

  const classes = computed(() => props.status === null ? null : `work-pool-status-icon--${props.status.toLowerCase()}`)

  const tooltipText = computed(() => {
    switch (props.status) {
      case 'ready':
        return 'Work pool has at least one online worker ready to execute work.'
      case 'not_ready':
        return 'Work pool does not have any online workers ready to execute work.'
      case 'paused':
        return 'Work pool is paused. No work will be executed.'
      default:
        return ''
    }
  })
</script>

<style>
.work-pool-status-icon { @apply
  flex
  items-center
  cursor-help
  w-2
  h-2
  align-middle
  text-inverse
  dark:text-default
  rounded-full
}

.work-pool-status-icon--ready { @apply
  bg-sentiment-positive
}

.work-pool-status-icon--not_ready { @apply
  bg-sentiment-negative
}

.work-pool-status-icon--paused { @apply
  flex
  items-center
  cursor-help
  text-subdued
}
</style>