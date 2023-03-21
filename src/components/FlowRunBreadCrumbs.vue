<template>
  <div class="flow-run-bread-crumbs">
    <FlowRouterLink :flow-id="flowRun.flowId" class="flow-run-bread-crumbs__flow-link">
      <template #after>
        <p-icon icon="ChevronRightIcon" size="small" />
      </template>
    </FlowRouterLink>
    <p-link :to="routes.flowRun(flowRun.id)" class="flow-run-bread-crumbs__flow-run-link">
      <span>{{ flowRun.name }}</span>
    </p-link>
  </div>
</template>

<script lang="ts" setup>
  import FlowRouterLink from '@/components/FlowRouterLink.vue'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { FlowRun } from '@/models'

  defineProps<{
    flowRun: FlowRun,
  }>()

  const routes = useWorkspaceRoutes()
</script>

<style>
.flow-run-bread-crumbs { @apply
  text-foreground-200
}

.flow-run-bread-crumbs__flow-link { @apply
  font-semibold
}

.flow-run-bread-crumbs__flow-run-link { @apply
  font-normal
}
</style>