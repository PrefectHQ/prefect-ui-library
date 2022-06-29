<template>
  <page-heading class="page-heading-notifications" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.create.notification" :to="newNotificationRoute()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import PageHeading from '@/components/PageHeading.vue'
  import { notificationCreateRouteKey } from '@/router/routes'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  const crumbs = [{ text: 'Notifications' }]

  const newNotificationRoute = inject(notificationCreateRouteKey)
  const can = inject(canKey)
</script>