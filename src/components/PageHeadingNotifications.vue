<template>
  <page-heading class="page-heading-notifications" :crumbs="crumbs">
    <template v-if="can.create.notification_policy" #after-crumbs>
      <p-button small icon="PlusIcon" :to="routes.notificationCreate()" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Notifications' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>