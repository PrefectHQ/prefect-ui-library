<template>
  <page-heading v-if="flowRun" class="page-heading-flow-run" :crumbs="crumbs">
    <template #after-crumbs>
      <div v-if="flowRun.tags && flowRun.tags.length > 0" class="state-list-item__tags">
        <p-tag-wrapper v-bind="{ tags: flowRun.tags }" />
      </div>
    </template>

    <div class="page-heading-flow-run__flow-details">
      <div class="page-heading-flow-run__meta">
        <StateBadge :state="flowRun.state" />
        <FlowRunStartTime :flow-run="flowRun" />
        <template v-if="!isPending">
          <DurationIconText :duration="flowRun.duration" />
          <IconTextCount icon="Task" :count="taskRunsCount ?? 0" label="Task run" />
        </template>
      </div>
      <div class="page-heading-flow-run__relationships">
        <FlowRunFlow v-if="flowRun.flowId" :flow-id="flowRun.flowId" />
        <FlowRunParentFlowRun v-if="flowRun.parentTaskRunId" :parent-task-run-id="flowRun.parentTaskRunId" />
        <FlowRunDeployment v-if="flowRun.deploymentId" :deployment-id="flowRun.deploymentId" />
        <FlowRunWorkPool v-if="flowRun.workPoolName" :work-pool-name="flowRun.workPoolName" />
        <FlowRunWorkQueue
          v-if="flowRun.workQueueName"
          :work-queue-name="flowRun.workQueueName"
          :work-pool-name="flowRun.workPoolName"
          :flow-run-state="flowRun.stateType"
        />
        <FlowRunAutomation :flow-run />
      </div>
    </div>

    <template #actions>
      <template v-if="flowRun">
        <template v-if="media.sm">
          <FlowRunSuspendButton :flow-run @update="refresh" />
          <FlowRunResumeButton :flow-run @update="refresh" />
          <FlowRunRetryButton :flow-run @update="refresh" />
          <FlowRunCancelButton :flow-run @update="refresh" />
        </template>
        <FlowRunMenu :flow-run :show-all="!media.sm" @delete="emit('delete')" />
      </template>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import {
    StateBadge,
    PageHeading,
    FlowRunRetryButton,
    FlowRunResumeButton,
    FlowRunCancelButton,
    FlowRunSuspendButton,
    FlowRunStartTime,
    DurationIconText
  } from '@/components'
  import FlowRunAutomation from '@/components/FlowRunAutomation.vue'
  import FlowRunDeployment from '@/components/FlowRunDeployment.vue'
  import FlowRunFlow from '@/components/FlowRunFlow.vue'
  import FlowRunParentFlowRun from '@/components/FlowRunParentFlowRun.vue'
  import FlowRunWorkPool from '@/components/FlowRunWorkPool.vue'
  import FlowRunWorkQueue from '@/components/FlowRunWorkQueue.vue'
  import IconTextCount from '@/components/IconTextCount.vue'
  import { useComponent, useFlowRun, useTaskRunsCount, useWorkspaceRoutes } from '@/compositions'
  import { isPendingStateType } from '@/models'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const { FlowRunMenu } = useComponent()

  const routes = useWorkspaceRoutes()

  const emit = defineEmits(['delete'])

  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Runs', to: routes.runs({ tab: 'flow-runs' }) },
    { text: flowRun.value?.name ?? '' },
  ])

  const { flowRun, subscription } = useFlowRun(() => props.flowRunId, { interval: 30_000 })

  const isPending = computed(() => flowRun.value?.stateType ? isPendingStateType(flowRun.value.stateType) : true)

  const { count: taskRunsCount } = useTaskRunsCount(() => ({
    flowRuns: {
      id: [props.flowRunId],
    },
  }))

  function refresh(): void {
    subscription.refresh()
  }
</script>

<style>
.page-heading-flow-run {
  display: grid;
  grid-template-columns: 1fr auto;
}

.page-heading-flow-run__flow-details { @apply
  flex
  flex-col
  gap-2
}

.page-heading-flow-run__meta { @apply
  flex
  flex-col
  items-start
  gap-2
  mr-1
  md:flex-row
  md:flex-wrap
  md:items-center
}

.page-heading-flow-run__relationships { @apply
  flex
  flex-col
  items-start
  text-xs
  font-medium
  gap-2
  mr-1
  md:items-center
  md:flex-wrap
  md:flex-row
  md:gap-4
}
</style>
