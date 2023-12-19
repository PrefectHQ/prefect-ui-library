<template>
  <ComponentPage title="FlowRunsFilterGroup">
    <div class="flow-runs-filter-group__demo">
      <FlowRunsFilterGroup v-model:name="name" :filter="filter" @update:filter="setFilter" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import FlowRunsFilterGroup from '@/components/FlowRunsFilterGroup.vue'
  import { useWorkspaceFlowRunDashboardFilterFromRoute } from '@/compositions'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunsMock } from '@/demo/compositions/useFlowRunsMock'

  useFlowRunsMock(50)
  const name = ref('')
  const { filter, setFilter } = useWorkspaceFlowRunDashboardFilterFromRoute()
</script>

<style>
  .flow-runs-filter-group__demo { @apply
    h-[450px]
    flex
    flex-col
    gap-4
  }
</style>