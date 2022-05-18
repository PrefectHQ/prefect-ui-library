<template>
  <p-context-sidebar class="context-sidebar">
    <template #header>
      <slot name="header" />
    </template>

    <template #upper-links>
      <slot name="leading-content">
        <hr class="context-sidebar__divider context-sidebar__divider--mobile">
        <p-context-nav-item title="Flows" icon="Flow" to="/flows" />

        <hr class="context-sidebar__divider context-sidebar__divider--mobile">
        <p-context-nav-item title="Deployments" icon="LocationMarkerIcon" to="/deployments" />

        <hr class="context-sidebar__divider context-sidebar__divider--mobile">
        <p-context-nav-item title="Queues" icon="DatabaseIcon" to="/queues" />
      </slot>
    </template>

    <template #bottom-links>
      <slot name="trailing-content">
        <hr class="context-sidebar__divider">
        <p-context-nav-item title="Settings" icon="CogIcon" to="/settings" />
      </slot>
    </template>
  </p-context-sidebar>
</template>

<script lang="ts" setup>
  import { PContextSidebar, PContextNavItem } from '@prefecthq/prefect-design'
</script>

<style>
.context-sidebar__divider {
  @apply
  border-none
  h-[1px]
  bg-slate-600
  my-1
  -mx-3
}

.context-sidebar__divider--mobile {
  @apply
  sm:h-0
  sm:my-0
}
</style>