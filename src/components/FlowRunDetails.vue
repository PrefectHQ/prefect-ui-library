<template>
  <div class="flow-run-details">
    <p-key-value label="Flow Run ID" :value="flowRun.id" :alternate="alternate" />

    <p-key-value label="Flow ID" :value="flowRun.flowId" :alternate="alternate" />

    <template v-if="flowRun.deploymentId">
      <p-key-value label="Deployment ID" :value="flowRun.deploymentId" :alternate="alternate" />
    </template>

    <p-key-value label="Created" :value="formatDateTimeNumeric(flowRun.created)" :alternate="alternate" />

    <p-key-value label="Updated" :value="formatDateTimeNumeric(flowRun.updated)" :alternate="alternate" />

    <p-key-value label="Flow Version" :value="flowRun.flowVersion" :alternate="alternate" />

    <template v-if="flowRun.idempotencyKey">
      <p-key-value label="Idempotency Key" :value="flowRun.idempotencyKey" :alternate="alternate" />
    </template>

    <p-key-value label="Run Count" :value="flowRun.runCount ?? 0" :alternate="alternate" />

    <template v-if="flowRun.tags">
      <p-key-value label="Tags" :alternate="alternate">
        <p-tags :tags="flowRun.tags" />
      </p-key-value>
    </template>

    <p-key-value label="Tags" :alternate="alternate">
      <template #value>
        <template v-if="flowRun.tags?.length">
          <p-tags :tags="flowRun.tags" />
        </template>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTags, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { FlowRun } from '@/models/FlowRun'

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
