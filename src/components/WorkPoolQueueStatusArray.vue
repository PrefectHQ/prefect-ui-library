<template>
  <div class="work-pool-queue-status-array">
    <template v-if="!showTooMany && workPoolQueues.length > 0">
      <template v-for="workQueue in workPoolQueues" :key="workQueue.id">
        <WorkPoolQueueStatusIcon
          :work-pool-queue="workQueue"
        />
      </template>
    </template>
    <span v-if="!showTooMany && workPoolQueues.length < 1" class="work-pool-queue-status-array__none">N/A</span>
    <span v-if="showTooMany" class="work-pool-queue-status-array__too-many">Too many to show here.</span>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import WorkPoolQueueStatusIcon from '@/components/WorkPoolQueueStatusIcon.vue'
  import { useInterval, useWorkspaceApi } from '@/compositions'
  import { WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const maxWorkQueues = 50
  const api = useWorkspaceApi()
  const options = useInterval()

  const workPoolQueuesSubscription = useSubscription(
    api.workPoolQueues.getWorkPoolQueues,
    [props.workPool.name, { limit: maxWorkQueues + 1 }],
    options,
  )

  const workPoolQueues = computed(() => workPoolQueuesSubscription.response ?? [])
  const showTooMany = computed(() => workPoolQueues.value.length > maxWorkQueues)
</script>

<style>
.work-pool-queue-status-array { @apply
  inline-flex
  flex-wrap
  items-center
  justify-center
  gap-1
  min-h-[1.5rem]
  max-w-full
}

.work-pool-queue-status-array__none { @apply
  text-subdued
}

.work-pool-queue-status-array__too-many { @apply
  text-xs
  text-subdued
}
</style>
