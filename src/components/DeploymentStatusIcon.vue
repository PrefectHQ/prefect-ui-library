<template>
  <p-tooltip
    v-if="status"
    :text="tooltipText"
  >
    <div class="deployment-status-icon" :class="classes" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { DeploymentStatus } from '@/models'

  const props = defineProps<{
    status: DeploymentStatus,
  }>()

  const classes = computed(() => `deployment-status-icon--${props.status.toLowerCase()}`)

  const tooltipText = computed(() => {
    switch (props.status) {
      case 'ready':
        return 'One or more processes are actively polling this deployment'
      case 'not_ready':
        return 'This deployment has not been polled in the past 60 seconds'
      default:
        return ''
    }
  })
</script>

<style>
.deployment-status-icon { @apply
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

.deployment-status-icon--ready { @apply
  bg-sentiment-positive
}

.deployment-status-icon--not_ready { @apply
  bg-sentiment-negative
}
</style>