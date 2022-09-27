<template>
  <p-empty-state class="workspace-notifications-empty-state">
    <template #icon>
      <p-icon icon="BellIcon" class="workspace-notifications-empty-state__icon" />
    </template>

    <template #heading>
      Create a notification to get started
    </template>

    <template #description>
      Send an alert when any flow enters any state you specify.
    </template>

    <template #actions>
      <DocumentationButton topic="notifications" />
      <router-link v-if="can.create.notification_policy" :to="notificationCreateRoute()">
        <p-button>
          Create Notification
          <p-icon icon="PlusIcon" class="workspace-notifications-empty-state__link-icon" />
        </p-button>
      </router-link>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import { RouterLink } from 'vue-router'
  import DocumentationButton from './DocumentationButton.vue'
  import { useCan } from '@/compositions/useCan'
  import { notificationCreateRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const can = useCan()
  const notificationCreateRoute = inject(notificationCreateRouteKey)
</script>


<style>
.workspace-notifications-empty-state__icon {
  @apply
  w-12
  h-12
}

.workspace-notifications-empty-state__link-icon {
  @apply
  ml-2
  w-4
  h-4
}
</style>