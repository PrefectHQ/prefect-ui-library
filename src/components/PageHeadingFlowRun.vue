<template>
  <page-heading v-if="flowRun" class="page-heading-flow-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="flowRun.state" />
    </template>
    <template #actions>
      <FlowRunCancelButton v-if="media.sm" :flow-run="flowRun" />
      <FlowRunResumeButton v-if="media.sm" :flow-run="flowRun" />
      <FlowRunRetryButton v-if="media.sm" :flow-run="flowRun" />
      <FlowRunMenu :flow-run-id="flowRun.id" :show-all="!media.sm" @delete="emit('delete')" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunMenu from './FlowRunMenu.vue'
  import { StateBadge, PageHeading,  FlowRunRetryButton, FlowRunResumeButton, FlowRunCancelButton } from '@/components'
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
  const flowRunSubscription =  useSubscription(api.flowRuns.getFlowRun, [flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)
</script>