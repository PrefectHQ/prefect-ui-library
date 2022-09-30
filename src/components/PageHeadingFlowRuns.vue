<template>
  <page-heading class="page-heading-flow-runs" :crumbs="crumbs">
    <template #actions>
      <SavedFiltersSelect />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import  SavedFiltersSelect from '@/components/SavedFiltersSelect.vue'

  const crumbs = [{ text: 'Flow Runs' }]
</script>