<template>
  <p-context-sidebar>
    <template #header>
      <slot name="header" />
    </template>

    <template #upper-links>
      <slot name="leading-content">
        <hr class="border-none sm:h-0 sm:my-0 h-[1px] bg-slate-600 my-1 -mx-3">
        <p-context-nav-item title="Flows" icon="Flow" to="/flows" />

        <hr class="border-none sm:h-0 sm:my-0 h-[1px] bg-slate-600 my-1 -mx-3">
        <p-context-nav-item title="Deployments" icon="LocationMarkerIcon" to="/deployments" />

        <hr class="border-none sm:h-0 sm:my-0 h-[1px] bg-slate-600 my-1 -mx-3">
        <p-context-nav-item title="Queues" icon="DatabaseIcon" to="/queues" />
      </slot>
    </template>

    <template #bottom-links>
      <slot name="trailing-content">
        <hr class="border-none h-[1px] bg-slate-600 my-1 -mx-3">
        <p-context-nav-item title="Settings" icon="CogIcon" to="/settings" />
      </slot>
    </template>
  </p-context-sidebar>
</template>

<script lang="ts" setup>
  import { PContextSidebar, PContextNavItem } from '@prefecthq/prefect-design'
</script>