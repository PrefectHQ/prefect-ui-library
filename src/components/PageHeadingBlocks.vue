<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.create.block" :to="routes.blocksCatalog()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import PageHeading from '@/components/PageHeading.vue'
  import { useCan } from '@/compositions/useCan'
  import { useWorkspaceRoutes } from '@/router'

  const crumbs = [{ text: 'Blocks' }]

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>