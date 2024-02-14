<template>
  <p-tooltip
    v-if="status"
    class="work-pool-status-icon"
    :text="tooltipText"
  >
    <StatusIcon v-if="status !== 'paused'" :status="status" />
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
  import StatusIcon from '@/components/StatusIcon.vue'
  import { WorkPoolStatus } from '@/models'

  const props = defineProps<{
    status: WorkPoolStatus,
  }>()

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
.work-pool-status-icon--paused { @apply
  flex
  items-center
  text-subdued
}
</style>