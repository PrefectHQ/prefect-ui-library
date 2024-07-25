<template>
  <div class="work-pool-queue-details">
    <p-key-value label="Work Pool" :alternate="alternate">
      <template #value>
        <WorkPoolIconText :work-pool-name="workPoolName" />
      </template>
    </p-key-value>

    <p-key-value label="Status" :alternate="alternate">
      <template #value>
        <WorkPoolQueueStatusBadge v-if="workPool" :work-queue="workPoolQueue" />
      </template>
    </p-key-value>

    <p-key-value label="Last Polled" :alternate="alternate">
      <template #value>
        <FormattedDate v-if="workPoolQueue.lastPolled" :date="workPoolQueue.lastPolled" format="numeric" />
        <span v-else>Never</span>
      </template>
    </p-key-value>

    <p-key-value label="Description" :value="workPoolQueue.description" :alternate="alternate" />

    <p-key-value label="Priority" :value="workPoolQueue.priority" :alternate="alternate" />

    <p-divider />

    <p-key-value label="Work Queue ID" :value="workPoolQueue.id" :alternate="alternate" />

    <p-key-value label="Flow Run Concurrency" :value="workPoolQueue.concurrencyLimit" :alternate="alternate" />

    <p-key-value label="Created" :alternate="alternate">
      <template #value>
        <FormattedDate :date="workPoolQueue.created" format="numeric" />
      </template>
    </p-key-value>

    <p-key-value label="Last Updated" :alternate="alternate">
      <template #value>
        <FormattedDate :date="workPoolQueue.updated" format="numeric" />
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { toRefs, computed } from 'vue'
  import { WorkPoolIconText, WorkPoolQueueStatusBadge } from '@/components'
  import FormattedDate from '@/components/FormattedDate.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPoolQueue, WorkPoolsFilter } from '@/models'

  const props = defineProps<{
    workPoolQueue: WorkPoolQueue,
    workPoolName: string,
    alternate?: boolean,
  }>()

  const { workPoolName } = toRefs(props)
  const api = useWorkspaceApi()

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