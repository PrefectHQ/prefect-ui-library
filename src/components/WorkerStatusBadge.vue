<template>
  <p-tag class="worker-status-badge">
    <WorkerStatusIcon :status="worker.status" class="worker-status-badge__icon" />
    {{ capitalize(worker.status) }}
  </p-tag>
</template>

<script lang="ts" setup>
  import WorkerStatusIcon from '@/components/WorkerStatusIcon.vue'
  import { WorkPoolWorker } from '@/models'
  import { capitalize } from '@/utilities'

  defineProps<{
    worker: WorkPoolWorker,
  }>()
</script>
