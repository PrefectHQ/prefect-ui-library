<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs">
    <template v-if="can.create.block" #after-crumbs>
      <p-button small icon="PlusIcon" :to="routes.blocksCatalog()" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Blocks' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>