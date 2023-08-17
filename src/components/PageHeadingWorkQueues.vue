<template>
  <page-heading class="page-heading-work-queues" :crumbs="crumbs">
    <template v-if="can.create.work_queue" #after-crumbs>
      <p-button small icon="PlusIcon" :to="routes.workQueueCreate()" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Work Queues' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>