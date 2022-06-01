<template>
  <div class="flow-run-details">
    <p-key-value label="Flow Run ID" :value="flowRun.id" />

    <p-key-value label="Flow ID" :value="flowRun.flowId" />

    <template v-if="flowRun.deploymentId">
      <p-key-value label="Deployment ID" :value="flowRun.deploymentId" />
    </template>

    <p-key-value label="Created" :value="formatDateTimeNumeric(flowRun.created)" />

    <template v-if="flowRun.flowVersion">
      <p-key-value label="Flow Version" :value="flowRun.flowVersion" />
    </template>

    <template v-if="flowRun.idempotencyKey">
      <p-key-value label="Idempotency Key" :value="flowRun.idempotencyKey" />
    </template>

    <p-key-value label="Run Count" :value="flowRun.runCount ?? 0" />

    <template v-if="flowRun.flowRunner">
      <p-key-value label="Flow Runner" :value="flowRun.flowRunner?.type" />
    </template>

    <template v-if="flowRun.tags">
      <p-key-value label="Tags">
        <p-tags :tags="flowRun.tags" />
      </p-key-value>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTags, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { FlowRun } from '@/models/FlowRun'

  defineProps<{
    flowRun: FlowRun,
  }>()
</script>

<style>
  .flow-run-details {
    @apply
    flex
    flex-col
    gap-3
    items-start
  }

  .flow-run-details__tags {
    @apply
    mb-1
    mr-1
  }
</style>