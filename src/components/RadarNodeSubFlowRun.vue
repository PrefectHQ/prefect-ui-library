<template>
  <ORadarNode class="radar-node-flow-run">
    <template #aside>
      <div class="radar-node-flow-run__aside" :class="classes.asideClass" :title="stateName">
        <StateIcon :state-type="stateType" />
      </div>
    </template>

    <div class="radar-node-flow-run__content">
      <FlowRouterLink v-if="flowRun?.flowId" :flow-id="flowRun.flowId" after=" / " />

      <p-link :to="flowRunRoute(flowRunId)">
        {{ flowRunName }}
      </p-link>
    </div>

    <template #footer-leading>
      <DurationIconText :duration="duration" />
    </template>

    <template #collapsed-badge="{ collapsed }">
      <div class="radar-node-flow-run__collapsed-badge">
        {{ collapsed?.size.toLocaleString() }}
      </div>
    </template>
  </ORadarNode>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DurationIconText from './DurationIconText.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import ORadarNode from './RadarNode.vue'
  import StateIcon from './StateIcon.vue'
  import { FlowRun, GraphNode, StateType } from '@/models'
  import { flowRunRouteKey } from '@/router'
  import { flowRunsApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const flowRunRoute = inject(flowRunRouteKey)

  const props = defineProps<{
    graphNode: GraphNode,
  }>()

  if (!props.graphNode.state?.stateDetails?.childFlowRunId) {
    throw new Error('Sub flow run node was invoked for a graph node without a child flow run id')
  }

  const flowRunId = computed(() => {
    return props.graphNode.state!.stateDetails!.childFlowRunId!
  })

  const flowRunsApi = inject(flowRunsApiKey)
  const subscription = useSubscription(flowRunsApi.getFlowRun, [flowRunId])


  const flowRun = computed<FlowRun | undefined>(() => {
    return subscription.response
  })

  const flowRunName = computed(() => flowRun.value?.name)

  const state = computed(() => {
    return flowRun.value?.state ?? props.graphNode.state
  })

  const stateType = computed<StateType | undefined>(() => {
    return state.value?.type
  })

  const stateName = computed<string | undefined>(() => {
    return state.value?.name
  })

  const duration = computed<number>(() => {
    return flowRun.value?.estimatedRunTime ?? 0
  })

  const classes = computed(() => {
    return {
      asideClass: [`state--${stateType.value}`, {}],
    }
  })
</script>

<style>
.radar-node-flow-run {
  @apply
  max-w-sm
}

.radar-node-flow-run__content {
  @apply
  overflow-hidden
  overflow-ellipsis
  whitespace-nowrap
  max-w-[75%]
}

.radar-node-flow-run__aside {
  @apply
  flex
  items-center
  h-full
  px-2
  rounded-tl
  rounded-bl
}

.radar-node-flow-run__collapsed-badge {
  @apply
  text-xs
  text-white
  bg-slate-600
  p-1
  rounded-full
  min-w-[24px]
  min-h-[24px]
  text-center
  shadow
}
</style>