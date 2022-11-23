<template>
  <page-heading class="page-heading-work-queues" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.create.work_queue" :to="routes.workQueueCreate()">
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

  const crumbs = [{ text: 'Work Queues' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>