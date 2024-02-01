<template>
  <p-tag>
    <StatusIcon :status="worker.status === 'online' ? 'ready' : 'not_ready'" />
    <span class="worker-status-badge--status-text">{{ worker.status }}</span>
  </p-tag>
</template>

<script lang="ts" setup>
  import StatusIcon from '@/components/StatusIcon.vue'
  import { WorkPoolWorker } from '@/models'

  defineProps<{
    worker: WorkPoolWorker,
  }>()
</script>

<style>
.worker-status-badge--status-text { @apply
  capitalize
}
</style>
