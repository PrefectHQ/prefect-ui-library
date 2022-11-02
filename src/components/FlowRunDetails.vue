<template>
  <div class="flow-run-details">
    <p-key-value label="Flow Run ID" :value="flowRun.id" :alternate="alternate" />

    <p-key-value label="Flow ID" :value="flowRun.flowId" :alternate="alternate" />

    <template v-if="can.read.work_queue">
      <p-key-value v-if="flowRun.workQueueName" label="Work Queue" :alternate="alternate">
        <template #value>
          <WorkQueueIconText :work-queue-name="flowRun.workQueueName" />
        </template>
      </p-key-value>
    </template>

    <template v-if="flowRun.parentTaskRunId">
      <p-key-value label="Parent Flow Run" :alternate="alternate">
        <template #value>
          <FlowRunIconText :flow-run-id="parentFlowRunId" />
        </template>
      </p-key-value>
    </template>

    <template v-if="can.read.deployment && flowRun.deploymentId">
      <p-key-value label="Deployment ID" :value="flowRun.deploymentId" :alternate="alternate" />
    </template>

    <p-key-value label="Created" :value="formatDateTimeNumeric(flowRun.created)" :alternate="alternate" />

    <template v-if="flowRun.createdBy">
      <p-key-value label="Created By" :value="flowRun.createdBy.displayValue" :alternate="alternate" />
    </template>

    <p-key-value label="Updated" :value="formatDateTimeNumeric(flowRun.updated)" :alternate="alternate" />

    <p-key-value label="Flow Version" :value="flowRun.flowVersion" :alternate="alternate" />

    <template v-if="flowRun.idempotencyKey">
      <p-key-value label="Idempotency Key" :value="flowRun.idempotencyKey" :alternate="alternate" />
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
  import { PKeyValue, PTags } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import { FlowRunIconText } from '.'
  import  WorkQueueIconText  from '@/components/WorkQueueIconText.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { FlowRun } from '@/models/FlowRun'
  import { FlowRunFilter } from '@/types'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const api = useWorkspaceApi()

  const props = defineProps<{
    flowRun: FlowRun,
    alternate?: boolean,
  }>()

  const can = useCan()
  const parentFlowRunId = ref('')

  if (props.flowRun.parentTaskRunId) {
    const flowRunFilter: FlowRunFilter = {
      task_runs:{
        id: {
          any_: [props.flowRun.parentTaskRunId],
        },
      },
    }
    const parentFlowRunList: FlowRun[] = await api.flowRuns.getFlowRuns(flowRunFilter)
    parentFlowRunId.value  = parentFlowRunList[0].id
  }
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
