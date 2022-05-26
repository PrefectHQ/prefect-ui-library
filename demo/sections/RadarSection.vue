<template>
  <Section heading="Radar">
    <SubSection heading="Cards">
      {{ taskRun }}
      <RadarNodeTaskRun :task-run="taskRun" />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/DemoSection.vue'
  import SubSection from '../components/DemoSubSection.vue'
  import RadarNodeTaskRun from '@/components/RadarNodeTaskRun.vue'
  import { mocker } from '@/services/Mocker'

  const taskRun = mocker.create('taskRun')
</script>

<style>
.flow-runs-scatter-plot {
  height: 400px;
}
</style>