<template>
  <ComponentPage title="FlowRunDetails" :demos="demos">
    <template #description>
      <div class="flow-run-radar__main">
        <RadarApp :flow-run-id="flowRunGraph.id" />
      </div>
    </template>

    <template #mini-radar>
      <RadarSmall :flow-run-id="flowRunGraph.id" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { RadarApp, RadarSmall } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunGraphMock } from '@/demo/compositions/useFlowRunGraphMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    {
      title: 'Mini Radar',
    },
  ]

  const flowRunGraph = useFlowRunGraphMock()
</script>

<style>
.flow-run-radar__main {
  height: 80vh;
}
</style>