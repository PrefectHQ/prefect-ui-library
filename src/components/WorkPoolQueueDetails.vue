<template>
  <div class="work-pool-queue-details">
    <p-key-value label="Work Pool" :alternate="alternate">
      <template #value>
        <WorkPoolIconText :work-pool-name="workPoolName" />
      </template>
    </p-key-value>

    <p-key-value label="Work Pool Type" :value="workPoolTypeLabel" :alternate="alternate" />

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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { WorkPoolIconText } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPoolQueue } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workPoolQueue: WorkPoolQueue,
    workPoolName: string,
    alternate?: boolean,
  }>()

  const api = useWorkspaceApi()
  const { workPoolName } = toRefs(props)

  const workPoolSubscription = useSubscription(api.workPools.getWorkPoolByName, [workPoolName])
  const workPool = computed(() => workPoolSubscription.response)
  const workPoolTypeLabel = computed(() => workPool.value?.typeLabel)
</script>


<style>
.work-pool-queue-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>