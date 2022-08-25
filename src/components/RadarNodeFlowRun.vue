<template>
  <ORadarNode class="radar-node-flow-run">
    <template #aside>
      <div class="radar-node-flow-run__aside" :title="stateName">
        <p-icon icon="FlowRun" />
      </div>
    </template>

    <div class="radar-node-flow-run__content">
      <header class="radar-node-flow-run__header">
        <FlowRouterLink v-if="flowRun" :flow-id="flowRun.flowId" after=" / " />

        {{ flowRunName }}
      </header>

      <template v-if="flowRun">
        <StateBadge :state="flowRun.state" class="max-w-min" />
      </template>
    </div>

    <template #footer-leading>
      <div class="radar-node-flow-run__footer-leading">
        <template v-if="duration">
          <DurationIconText :duration="duration" />
        </template>

        <template v-if="flowRun">
          <FlowRunStartTime :flow-run="flowRun" />
        </template>
      </div>
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
  import StateBadge from './StateBadge.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import { FlowRun, GraphNode } from '@/models'
  import * as flowRunsApi from '@/services/FlowRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    graphNode: GraphNode,
  }>()

  const flowRunId = computed(() => {
    return props.graphNode.id
  })

  const getFlowRun = inject(flowRunsApi.getFlowRunKey, flowRunsApi.getFlowRun)
  const subscription = useSubscription(getFlowRun, [flowRunId])

  const flowRun = computed<FlowRun | undefined>(() => {
    return subscription.response
  })

  const flowRunName = computed(() => flowRun.value?.name)

  const state = computed(() => {
    return flowRun.value?.state ?? props.graphNode.state
  })

  const stateName = computed<string | undefined>(() => {
    return state.value?.name
  })

  const duration = computed(() => {
    return flowRun.value?.duration
  })
</script>

<style>
.radar-node-flow-run {
  @apply
  w-[24rem]
  min-h-[160px]
}

.radar-node-flow-run__content {
  @apply
  flex
  flex-col
  gap-2
}

.radar-node-flow-run__header {
  @apply
  overflow-hidden
  overflow-ellipsis
  whitespace-nowrap
  max-w-[90%]
}

.radar-node-flow-run__footer-leading {
  @apply
  flex
  gap-2
}

.radar-node-flow-run__footer-leading > * {
  @apply
  w-max
}

.radar-node-flow-run__aside {
  @apply
  flex
  items-center
  h-full
  px-2
  text-slate-700
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