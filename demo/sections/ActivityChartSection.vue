<template>
  <Section heading="Activity Chart">
    <SubSection heading="Flow">
      <div class="activity-chart-section__container">
        <FlowActivityChart v-for="(activity, i) in activities" :key="i" :history="activity" show-now class="activity-chart-section__flow" />
      </div>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import Section from '../components/DemoSection.vue'
  import SubSection from '../components/DemoSubSection.vue'
  import FlowActivityChart from '@/components/FlowRunsScatterPlot.vue'
  import { UiFlowRunHistory } from '@/models'
  import { mocker } from '@/services/Mocker'

  const activities: UiFlowRunHistory[][] = reactive([])

  for (let i = 0; i < 10; ++i) {
    activities[i] = mocker.createMany('uiFlowRunHistory', mocker.create('number', [10, 100]))
  }
</script>

<style>
.activity-chart-section__container {
  @apply
  grid
  grid-cols-2
  auto-rows-max
}

.activity-chart-section__flow {
  @apply
  h-[200px]
}
</style>