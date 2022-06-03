<template>
  <page-heading class="page-heading-work-queues" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link :to="newQueueRoute()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { workQueueCreateRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const crumbs = [{ text: 'Queues' }]

  const newQueueRoute = inject(workQueueCreateRouteKey)
</script>