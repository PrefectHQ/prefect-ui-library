<template>
  <page-heading v-if="flowRun" class="page-heading-flow-run" :crumbs="crumbs">
    <template #after-crumbs>
      <StateBadge :state="flowRun.state" />
    </template>
    <template #actions>
      <slot name="actions" />
      <FlowRunCancelButton v-if="media.sm" :flow-run="flowRun" />
      <FlowRunResumeButton v-if="media.sm" :flow-run="flowRun" />
      <FlowRunRetryButton v-if="media.sm" :flow-run="flowRun" />
      <PageHeadingFlowRunOverflowMenu :flow-run-id="flowRun.id" @delete="emit('delete')" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import PageHeadingFlowRunOverflowMenu from './PageHeadingFlowRunOverflowMenu.vue'
  import { StateBadge, PageHeading,  FlowRunRetryButton, FlowRunResumeButton, FlowRunCancelButton } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { flowRunsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()
  const flowRunsRoute = inject(flowRunsRouteKey)

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  // It doesn't seem like we should need to coalesce here but
  // the flow run model dictates the flow run name can be null
  const crumbs = computed(() => [
    { text: 'Flow Runs', to: flowRunsRoute() },
    { text: flowRun.value?.name ?? '' },
  ])

  const flowRunSubscription =  useSubscription(api.flowRuns.getFlowRun, [props.flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)
</script>