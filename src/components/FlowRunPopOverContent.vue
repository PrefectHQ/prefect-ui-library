<template>
  <template v-if="flowRun">
    <article class="flow-run-popover-content">
      <header class="flow-run-popover-content__header">
        <h5>
          <FlowRouterLink :flow-id="flowRun.flowId" after=" / " />
          <p-link :to="flowRunRoute(flowRun.id)">
            <span>{{ flowRun.name }}</span>
          </p-link>
        </h5>
      </header>

      <StateBadge :state="flowRun.state" class="max-w-min" />

      <p-divider />

      <aside class="flow-run-popover-content__aside">
        <template v-if="flowRun.deploymentId">
          <DeploymentIconText :deployment-id="flowRun.deploymentId" />
        </template>

        <template v-if="flowRun.duration">
          <DurationIconText :duration="flowRun.duration" />
        </template>

        <FlowRunStartTime :flow-run="flowRun" />

        <p-tags class="flow-run-popover-content__tags" :tags="tags" />
      </aside>
    </article>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DeploymentIconText from './DeploymentIconText.vue'
  import DurationIconText from './DurationIconText.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import StateBadge from './StateBadge.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import { flowRunRouteKey } from '@/router'
  import * as flowRunsApi from '@/services/FlowRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const flowRunRoute = inject(flowRunRouteKey)
  const getFlowRun = inject(flowRunsApi.getFlowRunKey, flowRunsApi.getFlowRun)
  const flowRunSubscription = useSubscription(getFlowRun, [props.flowRunId])
  const flowRun = computed(() => flowRunSubscription.response)
  const tags = computed(() => flowRun.value?.tags ?? [])
</script>

<style>
.flow-run-popover-content { @apply
  p-3
  grid
  gap-1
  bg-white
  border-[1px]
  border-slate-300
  rounded
  max-w-xs
  w-screen
  shadow-md
}

.flow-run-popover-content__header { @apply
  grid
  gap-1
}

.flow-run-popover-content__aside { @apply
  grid
  gap-2
}

.flow-run-popover-content__tags { @apply
  mt-2
}

.flow-run-popover-content__tags .p-tag { @apply
  !text-xs
}
</style>