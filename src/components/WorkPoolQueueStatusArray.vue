<template>
  <div v-if="workPoolQueues.length <= maxWorkQueues" class="work-pool-queue-status-array">
    <WorkPoolQueueStatusIcon
      v-for="workQueue in workPoolQueues"
      :key="workQueue.id"
      :work-queue-name="workQueue.name"
      :work-pool-name="workPool.name"
      class="work-pool-queue-status-badge__icon"
    />
  </div>
  <span v-else>{{ workPoolQueues.length }}</span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { WorkPoolQueueStatusIcon } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const maxWorkQueues = 50
  const api = useWorkspaceApi()

  const workPoolQueuesSubscription = useSubscription(api.workPoolQueues.getWorkPoolQueues, [props.workPool.name])
  const workPoolQueues = computed(() => workPoolQueuesSubscription.response ?? [])
</script>

<style>
.work-pool-queue-status-array { @apply
  inline-flex
  flex-wrap
  items-center
  justify-center
  gap-1
  max-w-full
}
</style>
