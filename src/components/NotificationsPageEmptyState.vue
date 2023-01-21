<template>
  <p-empty-state class="workspace-notifications-empty-state">
    <template #icon>
      <p-icon icon="BellIcon" class="workspace-notifications-empty-state__icon" />
    </template>

    <template #heading>
      Create a notification to begin monitoring your flows
    </template>

    <template #description>
      Send an alert when a flow enters a specific state.
    </template>

    <template #actions>
      <DocumentationButton topic="notifications" />
      <p-button v-if="can.create.notification_policy" :to="routes.notificationCreate()">
        Create Notification
        <p-icon icon="PlusIcon" class="workspace-notifications-empty-state__link-icon" />
      </p-button>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>


<style>
.workspace-notifications-empty-state__icon { @apply
  w-12
  h-12
}

.workspace-notifications-empty-state__link-icon { @apply
  ml-2
  w-4
  h-4
}
</style>
