<template>
  <p-tag>
    <WorkerStatusIcon :status="worker.status" />
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
