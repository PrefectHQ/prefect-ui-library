<template>
  <div class="worker-pool-details">
    <p-key-value label="Description" :value="workerPool.description" :alternate="alternate" />

    <p-key-value label="Type" :value="workerPool.typeLabel" :alternate="alternate" />

    <p-key-value label="Concurrency Limit" :value="workerPool.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(workerPool.created)" :alternate="alternate" />

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(workerPool.updated)" :alternate="alternate" />

    <p-key-value v-if="workerPoolWorkers.length" label="Last Polled" :value="formatDateTimeNumeric(lastWorkerHeartbeat)" :alternate="alternate" />
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkerPool } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workerPool: WorkerPool,
    alternate?: boolean,
  }>()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

  const workerPoolWorkersSubscription = useSubscription(api.workerPoolWorkers.getWorkers, [props.workerPool.name, {}], subscriptionOptions)
  const workerPoolWorkers = computed(() => workerPoolWorkersSubscription.response ?? [])
  const lastWorkerHeartbeat = computed(() => workerPoolWorkers.value[0].lastHeartbeatTime)
</script>

<style>
.worker-pool-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>