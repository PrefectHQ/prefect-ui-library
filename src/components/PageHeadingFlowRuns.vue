<template>
  <page-heading class="page-heading-flow-runs" :crumbs="crumbs">
    <template #actions>
      <FlowRunsFilterSelect />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import  FlowRunsFilterSelect from '@/components/FlowRunsFilterSelect.vue'
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Flow Runs' }]
</script>