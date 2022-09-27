<template>
  <page-heading class="page-heading-notifications" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.create.notification_policy" :to="newNotificationRoute()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import PageHeading from '@/components/PageHeading.vue'
  import { useCan } from '@/compositions/useCan'
  import { notificationCreateRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const crumbs = [{ text: 'Notifications' }]

  const can = useCan()
  const newNotificationRoute = inject(notificationCreateRouteKey)
</script>