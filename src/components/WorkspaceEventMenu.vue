<template>
  <p-icon-button-menu class="workspace-event-menu">
    <CopyOverflowMenuItem label="Copy ID" :item="event.id" />
    <router-link v-if="can.create.automation" :to="routes.automateEvent(event)">
      <p-overflow-menu-item label="Automate" />
    </router-link>
  </p-icon-button-menu>
</template>

<script lang="ts" setup>
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { useCan } from '@/compositions/useCan'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { WorkspaceEvent } from '@/models/workspaceEvent'

  defineProps<{
    event: WorkspaceEvent,
  }>()

  const routes = useWorkspaceRoutes()
  const can = useCan()
</script>