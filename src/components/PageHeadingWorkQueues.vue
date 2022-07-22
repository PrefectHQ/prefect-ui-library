<template>
  <page-heading class="page-heading-work-queues" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.create.work_queue" :to="newQueueRoute()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import PageHeading from '@/components/PageHeading.vue'
  import { workQueueCreateRouteKey } from '@/router/routes'
  import { canKey } from '@/types/permissions'
  import { inject } from '@/utilities'

  const crumbs = [{ text: 'Work Queues' }]

  const newQueueRoute = inject(workQueueCreateRouteKey)
  const can = inject(canKey)
</script>