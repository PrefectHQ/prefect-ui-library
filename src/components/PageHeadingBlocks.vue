<template>
  <page-heading class="page-heading-blocks" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link :to="blockCatalogRoute()">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import PageHeading from '@/components/PageHeading.vue'
  import { blockCatalogRouteKey } from '@/router/routes'
  import { inject } from '@/utilities'

  const crumbs = [{ text: 'Blocks' }]

  const blockCatalogRoute = inject(blockCatalogRouteKey)
</script>