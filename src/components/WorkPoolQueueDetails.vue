<template>
  <div class="work-pool-queue-details">
    <p-key-value label="Work Pool" :alternate="alternate">
      <template #value>
        <WorkPoolIconText :work-pool-name="workPoolName" />
      </template>
    </p-key-value>

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
  import { toRefs } from 'vue'
  import { WorkPoolIconText } from '@/components'
  import { WorkPoolQueue } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    workPoolQueue: WorkPoolQueue,
    workPoolName: string,
    alternate?: boolean,
  }>()

  const { workPoolName } = toRefs(props)
</script>


<style>
.work-pool-queue-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>