<template>
  <div class="flow-run-bread-crumbs">
    <FlowRouterLink :flow-id="flowRun.flowId" class="flow-run-bread-crumbs__flow-link">
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
  import { PLink } from '@prefecthq/prefect-design'
  import { useRouteParam } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRouterLink from '@/components/FlowRouterLink.vue'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { FlowRun } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const routes = useWorkspaceRoutes()

  const flowRunId = useRouteParam('flowRunId')

  const component = computed(() => {
    if (flowRunId.value && props.flowRun.id === flowRunId.value) {
      return 'span'
    }

    return PLink
  })
</script>

<style>
.flow-run-bread-crumbs { @apply
  text-foreground-200
}

.flow-run-bread-crumbs__flow-link { @apply
  font-semibold
}

.flow-run-bread-crumbs__flow-run-link:not(a) { @apply
  text-foreground
}

.flow-run-bread-crumbs__flow-run-link { @apply
  font-normal
}
</style>