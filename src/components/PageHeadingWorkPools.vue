<template>
  <page-heading class="page-heading-work-pools" :crumbs="crumbs">
    <template v-if="can.create.work_pool" #after-crumbs>
      <p-button inset size="xs" icon="PlusIcon" :to="routes.workPoolCreate()" />
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