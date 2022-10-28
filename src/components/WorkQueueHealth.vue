<template>
  <span v-if="workQueueStatus" class="work-queue-health">
    {{ workQueue.isPaused ? 'Paused' : healthy ? 'Healthy' : 'Unhealthy' }}
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const api = useWorkspaceApi()
  const workQueueStatusSubscription = useSubscription(api.workQueues.getWorkQueueStatus, [props.workQueue.id])
  const workQueueStatus = computed(() => workQueueStatusSubscription.response)
  const healthy = computed(()=> workQueueStatus.value?.healthy)
</script>