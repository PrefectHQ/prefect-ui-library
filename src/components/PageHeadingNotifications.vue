<template>
  <page-heading class="page-heading-notifications" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.create.notification_policy" :to="routes.notificationCreate()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Notifications' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>