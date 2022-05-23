<template>
  <p-context-sidebar class="context-sidebar">
    <template #header>
      <slot name="header" />
    </template>

    <slot>
      <p-context-nav-item title="Flows" icon="Flow" to="/flows" />
      <p-context-nav-item title="Deployments" icon="LocationMarkerIcon" to="/deployments" />
      <p-context-nav-item title="Queues" icon="DatabaseIcon" to="/queues" />
    </slot>

    <template #footer>
      <slot name="footer">
        <p-context-nav-item title="Settings" icon="CogIcon" to="/settings" />
      </slot>
    </template>
  </p-context-sidebar>
</template>

<script lang="ts" setup>
  import { PContextSidebar, PContextNavItem } from '@prefecthq/prefect-design'
</script>