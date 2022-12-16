<template>
  <page-heading v-if="flowRun" class="page-heading-flow-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="flowRun.state" />
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
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { StateBadge, PageHeading, FlowRunRetryButton, FlowRunResumeButton, FlowRunCancelButton, FlowRunPauseButton, FlowRunMenu } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'

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
</script>