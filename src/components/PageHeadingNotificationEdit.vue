<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from './PageHeading.vue'
  import { notificationsRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const notificationsRoute = inject(notificationsRouteKey)

  const crumbs = [
    { text: 'Notifications', to: notificationsRoute() },
    { text: 'Edit' },
  ]
</script>