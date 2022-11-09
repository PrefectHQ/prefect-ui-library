<template>
  <ComponentPage title="FlowRunDetails" :demos="demos">
    <FlowRunDetails :flow-run="flowRun" />


    <template #no-relations>
      <FlowRunDetails :flow-run="flowRunWithNoRelations" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunDetails from '@/components/FlowRunDetails.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunMock } from '@/demo/compositions/useFlowRunsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'No Relations', description: 'With no deployment or work queue' }]

  const flowRun = useFlowRunMock()
  const flowRunWithNoRelations = useFlowRunMock({
    deploymentId: null,
    workQueueName: null,
  })
</script>
