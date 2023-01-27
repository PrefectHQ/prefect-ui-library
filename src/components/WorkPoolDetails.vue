<template>
  <div class="work-pool-details">
    <p-key-value label="Description" :value="workPool.description" :alternate="alternate" />

    <p-key-value label="Concurrency Limit" :value="workPool.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(workPool.created)" :alternate="alternate" />

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(workPool.updated)" :alternate="alternate" />

    <p-key-value v-if="workPoolWorkers.length" label="Last Polled" :value="formatDateTimeNumeric(lastWorkerHeartbeat)" :alternate="alternate" />
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPool } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workPool: WorkPool,
    alternate?: boolean,
  }>()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }

  const workPoolWorkersSubscription = useSubscription(api.workPoolWorkers.getWorkers, [props.workPool.name, {}], subscriptionOptions)
  const workPoolWorkers = computed(() => workPoolWorkersSubscription.response ?? [])
  const lastWorkerHeartbeat = computed(() => workPoolWorkers.value[0].lastHeartbeatTime)
</script>

<style>
.work-pool-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>