<template>
  <template v-if="flowRun">
    <article class="flow-run-popover-content">
      <FlowRunBreadCrumbs :flow-run="flowRun" />

      <StateBadge :state="flowRun.state" class="max-w-fit" />

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
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import DurationIconText from '@/components/DurationIconText.vue'
  import FlowRunBreadCrumbs from '@/components/FlowRunBreadCrumbs.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()
  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [props.flowRunId])
  const flowRun = computed(() => flowRunSubscription.response)
  const tags = computed(() => flowRun.value?.tags ?? [])
</script>

<style>
.flow-run-popover-content { @apply
  p-3
  grid
  gap-1
  bg-floating
  rounded-default
  max-w-xs
  w-screen
  shadow-lg
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