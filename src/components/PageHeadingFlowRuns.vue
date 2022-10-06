<template>
  <page-heading class="page-heading-flow-runs" :crumbs="crumbs">
    <template #actions>
      <SavedFilters />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import  SavedFilters from '@/components/SavedFilters.vue'

  const crumbs = [{ text: 'Flow Runs' }]
</script>