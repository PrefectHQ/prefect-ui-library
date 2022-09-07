<template>
  <div class="flow-run-details">
    <p-key-value label="Flow Run ID" :value="flowRun.id" :alternate="alternate" />

    <p-key-value label="Flow ID" :value="flowRun.flowId" :alternate="alternate" />

    <p-key-value v-if="flowRun.workQueueName" label="Work Queue" :alternate="alternate">
      <template #value>
        <WorkQueueIconText :work-queue-name="flowRun.workQueueName" />
      </template>
    </p-key-value>

    <template v-if="flowRun.deploymentId">
      <p-key-value label="Deployment ID" :value="flowRun.deploymentId" :alternate="alternate" />
    </template>

    <p-key-value label="Created" :value="formatDateTimeNumeric(flowRun.created)" :alternate="alternate" />

    <p-key-value label="Updated" :value="formatDateTimeNumeric(flowRun.updated)" :alternate="alternate" />

    <p-key-value label="Flow Version" :value="flowRun.flowVersion" :alternate="alternate" />

    <template v-if="flowRun.idempotencyKey">
      <p-key-value label="Idempotency Key" :value="flowRun.idempotencyKey" :alternate="alternate" />
    </template>

    <template v-if="flowRun.idempotencyKey || flowRun.stateType === 'scheduled'">
      <p-key-value v-if="flowRun.startTime" label="Start Time" :value="formatDateTimeNumeric(flowRun.startTime)" :alternate="alternate" />

      <p-key-value v-if="flowRun.expectedStartTime" label="Expected Start Time" :value="formatDateTimeNumeric(flowRun.expectedStartTime)" :alternate="alternate" />

      <p-key-value label="Estimated Start Time Delta" :value="secondsToApproximateString(flowRun.estimatedStartTimeDelta ?? 0)" :alternate="alternate" />
    </template>

    <p-key-value label="Run Count" :value="flowRun.runCount ?? 0" :alternate="alternate" />

    <p-key-value label="Tags" :alternate="alternate">
      <template v-if="flowRun.tags?.length" #value>
        <p-tags :tags="flowRun.tags!" />
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTags, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import  WorkQueueIconText  from '@/components/WorkQueueIconText.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { secondsToApproximateString } from '@/utilities/seconds'

  defineProps<{
    flowRun: FlowRun,
    alternate?: boolean,
  }>()
</script>

<style>
  .flow-run-details {
    @apply
    flex
    flex-col
    gap-2
    items-start
  }

  .flow-run-details__tags {
    @apply
    mb-1
    mr-1
  }
</style>
