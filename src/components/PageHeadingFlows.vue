<template>
  <PageHeading class="page-heading-flows" :crumbs="crumbs">
    <template v-if="can.access.collections" #after-crumbs>
      <p-button :to="routes.flowCollections()" secondary>
        Add from Collection
      </p-button>
    </template>
  </PageHeading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useCan, useWorkspaceRoutes } from '@/compositions'

  const can = useCan()
  const routes = useWorkspaceRoutes()

  const crumbs = [{ text: 'Flows' }]
</script>