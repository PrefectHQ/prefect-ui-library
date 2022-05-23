<template>
  <p-context-sidebar class="context-sidebar">
    <template #header>
      <slot name="header" />
    </template>

    <slot>
      <p-context-nav-item title="Runs" icon="FlowRun" :to="flowRunsRoute()" />
      <p-context-nav-item title="Flows" icon="Flow" :to="flowsRoute()" />
      <p-context-nav-item title="Deployments" icon="LocationMarkerIcon" :to="deploymentsRoute()" />
      <p-context-nav-item title="Queues" icon="DatabaseIcon" :to="queuesRoute()" />
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
  import { flowRunsRouteKey, flowsRouteKey, deploymentsRouteKey, queuesRouteKey, settingsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const flowRunsRoute = inject(flowRunsRouteKey)
  const flowsRoute = inject(flowsRouteKey)
  const deploymentsRoute = inject(deploymentsRouteKey)
  const queuesRoute = inject(queuesRouteKey)
  const settingsRoute = inject(settingsRouteKey)
</script>