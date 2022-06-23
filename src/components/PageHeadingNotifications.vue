<template>
  <page-heading class="page-heading-work-queues" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link :to="newNotificationRoute()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import PageHeading from '@/components/PageHeading.vue'
  import { notificationCreateRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const crumbs = [{ text: 'Queues' }]

  const newNotificationRoute = inject(notificationCreateRouteKey)
</script>