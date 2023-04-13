<template>
  <div class="flow-run-bread-crumbs">
    <FlowRouterLink :flow-id="flowRun.flowId" class="flow-run-bread-crumbs__flow-link">
      <template #after>
        <p-icon icon="ChevronRightIcon" size="small" />
      </template>
    </FlowRouterLink>
    <template v-if="isFlowRunRouteActive">
      <strong class="flow-run-bread-crumbs__flow-run-name">{{ flowRun.name }}</strong>
    </template>
    <template v-else>
      <p-link :to="routes.flowRun(flowRun.id)" class="flow-run-bread-crumbs__flow-run-link">
        <span>{{ flowRun.name }}</span>
      </p-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import FlowRouterLink from '@/components/FlowRouterLink.vue'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { FlowRun } from '@/models'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const routes = useWorkspaceRoutes()
  const route = useRoute()

  const isFlowRunRouteActive = computed(() => {
    return routes.flowRun(props.flowRun.id).name === route.name
  })
</script>

<style>
.flow-run-bread-crumbs { @apply
  text-foreground-200
}

.flow-run-bread-crumbs__flow-link { @apply
  font-semibold
}

.flow-run-bread-crumbs__flow-run-name { @apply
  font-normal
  text-foreground
}

.flow-run-bread-crumbs__flow-run-link { @apply
  font-normal
}
</style>