<template>
  <ComponentPage title="FlowRunResults" :demos="demos">
    <FlowRunResults :flow-run="flowRun" />

    <template #no-results>
      <FlowRunResults :flow-run="flowRunNoResult" />
    </template>

    <template #no-flow-run-results>
      <FlowRunResults :flow-run="flowRunNoFlowRunResult" />
    </template>

    <template #no-task-run-results>
      <FlowRunResults :flow-run="flowRunNoTaskRunResult" />
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
      title: 'No results',
    },
    {
      title: 'No flow run results',
    },
    {
      title: 'No task run results',
    },
  ]

  const flowRun = useFlowRunMock()
  useTaskRunsMock(10, { flowRunId: flowRun.id })

  const flowRunNoResult = useFlowRunMock()
  const artifact = data.artifacts.find(artifact => artifact.flowRunId === flowRunNoResult.id)

  if (artifact) {
    data.artifacts.delete(artifact.id)
  }

  const flowRunNoFlowRunResult = useFlowRunMock()
  const flowRunNoFlowRunResultArtifact = data.artifacts.find(artifact => artifact.flowRunId === flowRunNoFlowRunResult.id)

  if (flowRunNoFlowRunResultArtifact) {
    data.artifacts.delete(flowRunNoFlowRunResultArtifact.id)
  }

  useTaskRunsMock(10, { flowRunId: flowRunNoFlowRunResult.id })

  const flowRunNoTaskRunResult = useFlowRunMock()
</script>