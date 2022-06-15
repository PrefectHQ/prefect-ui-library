<template>
  <p-context-sidebar class="context-sidebar">
    <template v-if="slots.header" #header>
      <slot name="header" />
    </template>

    <slot>
      <p-context-nav-item title="Flow Runs" icon="FlowRun" :to="flowRunsRoute()" />
      <p-context-nav-item title="Flows" icon="Flow" :to="flowsRoute()" />
      <p-context-nav-item title="Deployments" icon="LocationMarkerIcon" :to="deploymentsRoute()" />
      <p-context-nav-item title="Work Queues" icon="DatabaseIcon" :to="queuesRoute()" />
      <p-context-nav-item title="Blocks" icon="DatabaseIcon" :to="blocksRoute()" />
    </slot>

    <template #footer>
      <slot name="footer">
        <p-context-nav-item title="Settings" icon="CogIcon" :to="settingsRoute()" />
      </slot>
    </template>
  </p-context-sidebar>
</template>

<script lang="ts" setup>
  import { PContextSidebar, PContextNavItem } from '@prefecthq/prefect-design'
  import { useSlots } from 'vue'
  import { flowRunsRouteKey, flowsRouteKey, deploymentsRouteKey, workQueuesRouteKey, settingsRouteKey, blocksRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const slots = useSlots()

  const flowRunsRoute = inject(flowRunsRouteKey)
  const flowsRoute = inject(flowsRouteKey)
  const deploymentsRoute = inject(deploymentsRouteKey)
  const queuesRoute = inject(workQueuesRouteKey)
  const blocksRoute = inject(blocksRouteKey)
  const settingsRoute = inject(settingsRouteKey)
</script>