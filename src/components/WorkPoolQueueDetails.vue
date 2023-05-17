<template>
  <div class="work-pool-queue-details">
    <p-key-value label="Work Pool" :alternate="alternate">
      <template #value>
        <WorkPoolIconText :work-pool-name="workPoolName" />
      </template>
    </p-key-value>

    <p-key-value label="Status" :alternate="alternate">
      <template #value>
        <WorkQueueStatusBadge v-if="workPool" :work-queue="workPoolQueue" :work-pool="workPool" />
      </template>
    </p-key-value>

    <template v-if="workQueueStatus">
      <p-key-value label="Last Polled" :value="workQueueStatus.lastPolled ? formatDateTimeNumeric(workQueueStatus.lastPolled) : null" :alternate="alternate" />
    </template>

    <p-key-value label="Description" :value="workPoolQueue.description" :alternate="alternate" />

    <p-key-value label="Priority" :value="workPoolQueue.priority" :alternate="alternate" />

    <p-divider />

    <p-key-value label="Work Pool Queue ID" :value="workPoolQueue.id" :alternate="alternate" />

    <p-key-value label="Flow Run Concurrency" :value="workPoolQueue.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(workPoolQueue.created)" :alternate="alternate" />

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(workPoolQueue.updated)" :alternate="alternate" />
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { toRefs, computed } from 'vue'
  import { WorkPoolIconText, WorkQueueStatusBadge } from '@/components'
  import { useWorkspaceApi, useWorkQueueStatus } from '@/compositions'
  import { WorkQueue } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workPoolQueue: WorkQueue,
    workPoolName: string,
    alternate?: boolean,
  }>()

  const { workPoolName } = toRefs(props)
  const api = useWorkspaceApi()

  const { workQueueStatus } = useWorkQueueStatus(props.workPoolQueue.id)
  const workPoolArgs = computed<[WorkPoolsFilter] | null>(() => {
    return [
      {
        workPools: {
          id: [props.workPoolQueue.workPoolId],
        },
      },
    ]
  })

  const workPoolsSubscription = useSubscriptionWithDependencies(api.workPools.getWorkPools, workPoolArgs)
  const workPools = computed(() => workPoolsSubscription.response ?? [])
  const workPool = computed(() => workPools.value[0])
</script>


<style>
.work-pool-queue-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>