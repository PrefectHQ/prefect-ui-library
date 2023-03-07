<template>
  <ComponentPage title="FlowRunResults" :demos="demos">
    <FlowRunResults :flow-run="flowRun" />

    <template #no-results>
      <FlowRunResults :flow-run="flowRunNoResult" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunResults from '@/components/FlowRunResults.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunMock } from '@/demo/compositions/useFlowRunsMock'
  import { useTaskRunsMock } from '@/demo/compositions/useTaskRunsMock'
  import { DemoSection } from '@/demo/types/demoSection'
  import { data } from '@/demo/utilities/data'

  const demos: DemoSection[] = [
    {
      title: 'No Results',
    },
  ]

  const flowRun = useFlowRunMock()
  useTaskRunsMock(10, { flowRunId: flowRun.id })

  const flowRunNoResult = useFlowRunMock()
  const artifact = data.artifacts.getAll().find(artifact => artifact.flowRunId === flowRunNoResult.id)

  if (artifact) {
    data.artifacts.delete(artifact.id)
  }
</script>