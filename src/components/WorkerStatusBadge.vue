<template>
  <template v-if="worker">
    <p-tag class="worker-status-badge">
      <WorkerStatusIcon :status="workerStatus" class="worker-status-badge__icon" />
      {{ label }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkerStatusIcon from '@/components/WorkerStatusIcon.vue'
  import { WorkPoolWorker } from '@/models'
  import { capitalize } from '@/utilities'

  const props = defineProps<{
    worker: WorkPoolWorker,
  }>()

  const workerStatus = computed(() => props.worker.status)

  const label = computed(() => {
    return capitalize(props.worker.status)
  })
</script>

<style>
.worker-status-badge { @apply
  text-xs
  pl-1
}
</style>