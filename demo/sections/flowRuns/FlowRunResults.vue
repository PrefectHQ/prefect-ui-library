<template>
  <ComponentPage title="FlowRunResults">
    <template #description>
      <FlowRunResults :flow-run="flowRun" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunResults from '@/components/FlowRunResults.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunMock } from '@/demo/compositions/useFlowRunsMock'

  const flowRun = useFlowRunMock()
</script>