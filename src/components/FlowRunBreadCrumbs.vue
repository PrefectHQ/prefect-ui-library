<template>
  <div class="flow-run-bread-crumbs">
    <FlowRouterLink v-if="!hideFlowName" :flow-id="flowRun.flowId" class="flow-run-bread-crumbs__flow-link">
      <template #after>
        <p-icon icon="ChevronRightIcon" size="small" />
      </template>
    </FlowRouterLink>
    <component :is="component" :to="routes.flowRun(flowRun.id)" class="flow-run-bread-crumbs__flow-run-link">
      <span>{{ flowRun.name }}</span>
    </component>
  </div>
</template>

<script lang="ts" setup>
  import { useRouteParam } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRouterLink from '@/components/FlowRouterLink.vue'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { FlowRun } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
    hideFlowName?: boolean,
  }>()

  const routes = useWorkspaceRoutes()

  const flowRunId = useRouteParam('flowRunId')

  const component = computed(() => {
    if (flowRunId.value && props.flowRun.id === flowRunId.value) {
      return 'span'
    }

    return 'p-link'
  })
</script>

<style>
.flow-run-bread-crumbs { @apply
  text-subdued
}

.flow-run-bread-crumbs__flow-link { @apply
  font-semibold
}

.flow-run-bread-crumbs__flow-run-link:not(a) { @apply
  text-default
}

.flow-run-bread-crumbs__flow-run-link { @apply
  font-normal
}
</style>