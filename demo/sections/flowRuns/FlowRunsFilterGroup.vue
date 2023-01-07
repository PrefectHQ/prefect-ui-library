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
  import { useSeeds } from '@/demo/compositions/useSeeds'
  import { mocker } from '@/services'

  const flowRuns = mocker.createMany('flowRun', 200)
  const flows = mocker.createMany('flow', 25)
  const deployments = mocker.createMany('deployment', 8)

  useSeeds({
    flowRuns,
    flows,
    deployments,
  })
</script>

<style>
  .flow-runs-filter-group__demo { @apply
    h-[450px]
    flex
    flex-col
    gap-4
  }
</style>