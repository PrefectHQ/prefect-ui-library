<template>
  <Section heading="Scatter Plot">
    <SubSection heading="Flow Run History">
      <FlowRunsScatterPlot :history="history" show-now class="flow-runs-scatter-plot" />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/DemoSection.vue'
  import SubSection from '../components/DemoSubSection.vue'
  import FlowRunsScatterPlot from '@/components/FlowRunsScatterPlot.vue'
  import { mocker } from '@/services/Mocker'

  const history = mocker.createMany('uiFlowRunHistory', mocker.create('number', [10, 100]))
</script>

<style>
.flow-runs-scatter-plot {
  height: 400px;
}
</style>