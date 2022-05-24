<template>
  <page-heading class="page-heading-queues" :crumbs="crumbs">
    <router-link :to="newQueueRoute">
      <p-button inset size="xs" icon="PlusIcon" />
    </router-link>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { newQueueRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const crumbs = [{ text: 'Queues' }]

  const newQueueRoute = inject(newQueueRouteKey)
</script>