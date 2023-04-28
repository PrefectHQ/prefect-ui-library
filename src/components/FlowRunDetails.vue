<template>
  <div class="flow-run-details">
    <p-key-value label="Run Count" :value="flowRun.runCount ?? 0" :alternate="alternate" />

    <p-key-value label="Created" :value="formatDateTimeNumeric(flowRun.created)" :alternate="alternate" />

    <template v-if="flowRun.createdBy">
      <p-key-value label="Created By" :value="flowRun.createdBy.displayValue" :alternate="alternate" />
    </template>

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(flowRun.updated)" :alternate="alternate" />

    <template v-if="flowRun.idempotencyKey">
      <p-key-value label="Idempotency Key" :value="flowRun.idempotencyKey" :alternate="alternate" />
    </template>

    <p-key-value label="Tags" :alternate="alternate">
      <template v-if="flowRun.tags?.length" #value>
        <p-tags :tags="flowRun.tags!" />
      </template>
    </p-key-value>

    <p-key-value label="Flow Run ID" :value="flowRun.id" :alternate="alternate" />

    <p-key-value label="State Message" :alternate="alternate">
      <template v-if="stateMessage" #value>
        <p-text-truncate :text="stateMessage" />
      </template>
    </p-key-value>

    <template v-if="flowRun.flowVersion || flowRun.empiricalPolicy">
      <p-divider />

      <p-heading :heading="heading">
        Flow configuration
      </p-heading>

      <p-key-value label="Flow Version" :value="flowRun.flowVersion" :alternate="alternate" />

      <template v-if="flowRun.empiricalPolicy">
        <p-key-value label="Retries" :value="flowRun.empiricalPolicy.retries" :alternate="alternate" />
        <p-key-value label="Retry Delay" :value="`${flowRun.empiricalPolicy.retryDelaySeconds}s`" :alternate="alternate" />
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTags } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { FlowRun } from '@/models/FlowRun'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    flowRun: FlowRun,
    alternate?: boolean,
  }>()

  const heading = computed(() => props.alternate ? 6 : 5)

  const stateMessage = computed(() => props.flowRun.state?.message)
</script>

<style>
.flow-run-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.flow-run-details__work-queue-value { @apply
  flex
  items-center
  gap-1
}

.flow-run-details__tags { @apply
  mb-1
  mr-1
}
</style>
