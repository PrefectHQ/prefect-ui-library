<template>
  <ComponentPage title="FlowRunListItem" :demos="demos">
    <FlowRunListItem :flow-run="flowRun" :selected="[]" class="color-mode-default" />

    <template #disabled>
      <FlowRunListItem :flow-run="flowRun" :selected="[]" class="color-mode-default" disabled />
    </template>

    <template #no-relations>
      <FlowRunListItem :flow-run="flowRunWithNoRelations" :selected="[]" class="color-mode-default" disabled />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunListItem from '@/components/FlowRunListItem.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunMock } from '@/demo/compositions/useFlowRunsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Disabled', description: 'With selection disabled' },
    { title: 'No Relations', description: 'With no deployment or work queue' },
  ]

  const flowRun = useFlowRunMock()
  const flowRunWithNoRelations = useFlowRunMock({
    deploymentId: null,
    workQueueName: null,
  })
</script>
