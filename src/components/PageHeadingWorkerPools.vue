<template>
  <page-heading class="page-heading-worker-pools" :crumbs="crumbs">
    <template #after-crumbs>
      <BetaBadge />
      <p-button v-if="can.create.worker_pool" inset size="xs" icon="PlusIcon" :to="routes.workerPoolCreate()" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PageHeading, BetaBadge } from '@/components'
  import { useWorkspaceRoutes, useCan } from '@/compositions'

  const crumbs = [{ text: 'Worker Pools' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>