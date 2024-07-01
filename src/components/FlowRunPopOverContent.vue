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
  import { computed } from 'vue'
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import DurationIconText from '@/components/DurationIconText.vue'
  import FlowRunBreadCrumbs from '@/components/FlowRunBreadCrumbs.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { useFlowRun } from '@/compositions'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const { flowRun } = useFlowRun(() => props.flowRunId)
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
  text-wrap
  break-words;
  grid-template-columns: minmax(0, 1fr);
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