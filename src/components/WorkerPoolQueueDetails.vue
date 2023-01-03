<template>
  <div class="worker-pool-queue-details">
    <p-key-value label="Worker Pool" :alternate="alternate">
      <template #value>
        <WorkerPoolIconText :worker-pool-name="workerPoolName" />
      </template>
    </p-key-value>

    <p-key-value label="Worker Pool Type" :value="workerPoolTypeLabel" :alternate="alternate" />

    <p-key-value label="Description" :value="workerPoolQueue.description" :alternate="alternate" />

    <p-key-value label="Priority" :value="workerPoolQueue.priority" :alternate="alternate" />

    <p-divider />

    <p-key-value label="Worker Pool Queue ID" :value="workerPoolQueue.id" :alternate="alternate" />

    <p-key-value label="Flow Run Concurrency" :value="workerPoolQueue.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(workerPoolQueue.created)" :alternate="alternate" />

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(workerPoolQueue.updated)" :alternate="alternate" />
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { WorkerPoolIconText } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workerPoolQueue: WorkerPoolQueue,
    workerPoolName: string,
    alternate?: boolean,
  }>()

  const api = useWorkspaceApi()
  const { workerPoolName } = toRefs(props)

  const workerPoolSubscription = useSubscription(api.workerPools.getWorkerPoolByName, [workerPoolName])
  const workerPool = computed(() => workerPoolSubscription.response)
  const workerPoolTypeLabel = computed(() => workerPool.value?.typeLabel)
</script>


<style>
.worker-pool-queue-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>