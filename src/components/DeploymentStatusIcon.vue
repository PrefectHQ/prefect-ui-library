<template>
  <p-tooltip
    v-if="status"
    class="deployment-status-icon"
    :text="tooltipText"
  >
    <StatusIcon :status="status" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import StatusIcon from '@/components/StatusIcon.vue'
  import { DeploymentStatus } from '@/models'

  const props = defineProps<{
    status: DeploymentStatus,
  }>()

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
  cursor-help
}
</style>
