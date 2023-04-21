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
          <FlowRunTaskCount :tasks-count="taskRunsCount" />
        </template>
      </div>
      <div class="page-heading-flow-run__relationships">
        <FlowRunFlow v-if="flowRun.flowId" :flow-id="flowRun.flowId" />
        <FlowRunDeployment v-if="flowRun.deploymentId" :deployment-id="flowRun.deploymentId" />
        <FlowRunWorkPool v-if="flowRun.workPoolName" :work-pool-name="flowRun.workPoolName" />
        <FlowRunWorkQueue
          v-if="flowRun.workQueueName"
          :work-queue-name="flowRun.workQueueName"
          :work-pool-name="flowRun.workPoolName"
        />
      </div>
    </div>

    <template #actions>
      <template v-if="flowRun">
        <template v-if="media.sm">
          <FlowRunPauseButton :flow-run="flowRun" />
          <FlowRunResumeButton :flow-run="flowRun" />
          <FlowRunRetryButton :flow-run="flowRun" />
          <FlowRunCancelButton :flow-run="flowRun" />
        </template>
        <FlowRunMenu :flow-run-id="flowRun.id" :show-all="!media.sm" @delete="emit('delete')" />
      </template>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import {
    StateBadge,
    PageHeading,
    FlowRunRetryButton,
    FlowRunResumeButton,
    FlowRunCancelButton,
    FlowRunPauseButton,
    FlowRunMenu,
    FlowRunStartTime,
    DurationIconText
  } from '@/components'
  import FlowRunDeployment from '@/components/FlowRunDeployment.vue'
  import FlowRunFlow from '@/components/FlowRunFlow.vue'
  import FlowRunTaskCount from '@/components/FlowRunTaskCount.vue'
  import FlowRunWorkPool from '@/components/FlowRunWorkPool.vue'
  import FlowRunWorkQueue from '@/components/FlowRunWorkQueue.vue'
  import { useTaskRunsCount, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { isPendingStateType } from '@/models'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Flow Runs', to: routes.flowRuns() },
    { text: flowRun.value?.name ?? '' },
  ])

  const flowRunId = computed(() => props.flowRunId)
  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)

  const isPending = computed(() => flowRun.value?.stateType ? isPendingStateType(flowRun.value.stateType) : true)
  const { taskRunsCount } = useTaskRunsCount(flowRunId)
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
