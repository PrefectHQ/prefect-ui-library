<template>
  <Section heading="Radar">
    <SubSection heading="Base">
      <RadarNode :data="taskRun" />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/DemoSection.vue'
  import SubSection from '../components/DemoSubSection.vue'
  import RadarNode from '@/components/RadarNode.vue'
  import { mocker } from '@/services/Mocker'

  const taskRun = mocker.create('graphNode')
</script>

<style>
.flow-runs-scatter-plot {
  height: 400px;
}
</style>