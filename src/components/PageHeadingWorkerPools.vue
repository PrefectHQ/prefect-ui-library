<template>
  <page-heading class="page-heading-worker-pools" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.create.worker_pool" :to="routes.workerPoolCreate()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes, useCan } from '@/compositions'

  const crumbs = [{ text: 'Worker Pools' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>