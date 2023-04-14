<template>
  <PageHeading class="page-heading-flows" :crumbs="crumbs">
    <template v-if="can.access.collections">
      <p-link :to="routes.flowCollections()">
        Looking for collections?
      </p-link>
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