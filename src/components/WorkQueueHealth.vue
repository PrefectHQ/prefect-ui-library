<template>
  <span v-if="workQueueStatus" class="work-queue-health">
    {{ workQueue.isPaused ? 'Paused' : healthy ? 'Healthy' : 'Unhealthy' }}
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useWorkQueueStatus } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueueStatus = useWorkQueueStatus(props.workQueue.id)
  const healthy = computed(()=> workQueueStatus.value?.healthy)
</script>