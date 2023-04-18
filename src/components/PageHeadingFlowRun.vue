<template>
  <div v-if="flowRun" class="page-heading-flow-run">
    <page-heading class="page-heading-flow-run__heading" :crumbs="crumbs">
      <template #after-crumbs>
        <div v-if="flowRun.tags && flowRun.tags.length > 0" class="state-list-item__tags">
          <p-tag-wrapper v-bind="{ tags: flowRun.tags }" />
        </div>
      </template>
      <template #actions>
        <template v-if="media.sm">
          <FlowRunPauseButton :flow-run="flowRun" />
          <FlowRunResumeButton :flow-run="flowRun" />
          <FlowRunRetryButton :flow-run="flowRun" />
          <FlowRunCancelButton :flow-run="flowRun" />
        </template>
        <FlowRunMenu :flow-run-id="flowRun.id" :show-all="!media.sm" @delete="emit('delete')" />
      </template>
    </page-heading>
    <div class="page-heading-flow-run__meta">
      <StateBadge :state="flowRun.state" />
      <FlowRunStartTime :flow-run="flowRun" />
      <DurationIconText :duration="flowRun.duration" />
      <template v-if="!isPending">
        <FlowRunTaskCount :tasks-count="taskRunsCount">
          <template #default="{ count }">
            {{ count }} task {{ toPluralString('run', count) }}
          </template>
        </FlowRunTaskCount>
      </template>
    </div>
    <div class="page-heading-flow-run__relationships">
      <template v-if="flowRun.deploymentId && deployment?.name">
        <div class="flow-run-list-item__relation">
          <span>Deployment</span> <DeploymentIconText :deployment-id="flowRun.deploymentId" />
        </div>
      </template>

      <template v-if="flowRun.workPoolName">
        <div class="flow-run-list-item__relation">
          <span>Work Pool</span> <WorkPoolIconText :work-pool-name="flowRun.workPoolName" />
        </div>
      </template>

      <template v-if="flowRun.workQueueName">
        <div class="flow-run-list-item__relation">
          <span>Work Queue</span> <WorkQueueIconText :work-queue-name="flowRun.workQueueName" :work-pool-name="flowRun.workPoolName" />
        </div>
      </template>
    </div>
  </div>
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
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import FlowRunTaskCount from '@/components/FlowRunTaskCount.vue'
  import WorkPoolIconText from '@/components/WorkPoolIconText.vue'
  import WorkQueueIconText from '@/components/WorkQueueIconText.vue'
  import { useDeployment, useTaskRunsCount, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { isPendingStateType } from '@/models'
  import { toPluralString } from '@/utilities'

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

  const deploymentId = computed(() => flowRun.value?.deploymentId)
  const { deployment } = useDeployment(deploymentId)
</script>

<style>
.page-heading-flow-run { @apply
  flex
  flex-col
  gap-2
}

.page-heading-flow-run__heading {
  display: grid;
  grid-template-columns: 1fr auto;
}

.page-heading-flow-run__meta { @apply
  flex
  flex-col
  items-start
  gap-2
  whitespace-nowrap
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
  whitespace-nowrap
  mr-1
  md:items-center
  md:flex-wrap
  md:flex-row
  md:gap-4
}
</style>
