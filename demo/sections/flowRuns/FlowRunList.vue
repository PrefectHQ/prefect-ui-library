<template>
  <ComponentPage title="FlowRunList">
    <FlowRunList :flow-runs="flowRuns" :selected="[]" class="color-mode-default" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunList from '@/components/FlowRunList.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunsMock } from '@/demo/compositions/useFlowRunsMock'

  const flowRuns = useFlowRunsMock(5)
</script>
