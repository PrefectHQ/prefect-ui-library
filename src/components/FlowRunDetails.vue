<template>
  <div class="flow-run-details">
    <p-key-value label="Flow" :alternate="alternate">
      <template #value>
        <FlowIconText :flow-id="flowRun.flowId" />
      </template>
    </p-key-value>

    <p-key-value v-if="flowRun.deploymentId && showDeployment" label="Deployment" :alternate="alternate">
      <template #value>
        <DeploymentIconText :deployment-id="flowRun.deploymentId" />
      </template>
    </p-key-value>

    <template v-if="can.read.work_queue && flowRun.workQueueName">
      <p-key-value label="Work Queue" :alternate="alternate">
        <template #value>
          <div class="flow-run-details__work-queue-value">
            <WorkQueueIconText :work-queue-name="flowRun.workQueueName" />
            <WorkQueueStatusIcon :work-queue-name="flowRun.workQueueName" />
          </div>
        </template>
      </p-key-value>
    </template>

    <template v-if="parentFlowRunId">
      <p-key-value label="Parent Flow Run" :alternate="alternate">
        <template #value>
          <FlowRunIconText :flow-run-id="parentFlowRunId" />
        </template>
      </p-key-value>
    </template>

    <p-divider />

    <p-heading :heading="heading">
      Flow Run
    </p-heading>

    <p-key-value label="Start Time" :alternate="alternate">
      <template #value>
        <FlowRunStartTime :flow-run="flowRun" />
      </template>
    </p-key-value>

    <p-key-value label="Duration" :alternate="alternate">
      <template #value>
        <DurationIconText :duration="flowRun.duration" />
      </template>
    </p-key-value>

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
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { WorkQueueIconText, FlowRunIconText, WorkQueueStatusIcon, FlowRunStartTime, FlowIconText, DurationIconText, DeploymentIconText } from '@/components'
  import { useWorkspaceApi, useCan } from '@/compositions'
  import { useDeployment } from '@/compositions/useDeployment'
  import { FlowRun } from '@/models/FlowRun'
  import { isDefined } from '@/utilities'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const api = useWorkspaceApi()

  const props = defineProps<{
    flowRun: FlowRun,
    alternate?: boolean,
  }>()

  const can = useCan()
  const heading = computed(() => props.alternate ? 6 : 5)

  const deploymentId = computed(() => props.flowRun.deploymentId)
  const deployment = useDeployment(deploymentId)
  const showDeployment = computed(() => can.read.deployment && isDefined(deployment.value))
  const stateMessage = computed(() => props.flowRun.state?.message)

  const flowRunFilter = computed<Parameters<typeof api.flowRuns.getFlowRuns> | null>(() => {
    if (props.flowRun.parentTaskRunId) {
      return [
        {
          taskRuns: {
            id: [props.flowRun.parentTaskRunId],
          },
        },
      ]
    }
    return null
  })

  const parentFlowRunListSubscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRuns, flowRunFilter)
  const parentFlowRunList = computed(() => parentFlowRunListSubscription.response ?? [])

  const parentFlowRunId = computed(() => {
    if (!parentFlowRunList.value.length) {
      return
    }
    const [value] = parentFlowRunList.value
    return value.id
  })
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

.flow-run-details .flow-run-details__small-radar { @apply
  h-[250px]
  w-[250px]
}

.flow-run-details__small-radar-link { @apply
  cursor-pointer
  inline-block
}
</style>
