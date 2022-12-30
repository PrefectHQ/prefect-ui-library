<template>
  <ComponentPage title="FlowRunsFilterGroup">
    <div class="flow-runs-filter-group__demo">
      <FlowRunsFilterGroup />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunsFilterGroup from '@/components/FlowRunsFilterGroup.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
</script>

<style>
  .flow-runs-filter-group__demo { @apply
    h-[450px]
    flex
    flex-col
    gap-4
  }
</style>