<template>
  <Section heading="Activity Chart">
    <SubSection heading="Flow">
      <div class="activity-chart-section__container">
        <FlowActivityChart v-for="(flow, i) in flows" :key="i" :flow="flow" show-now class="activity-chart-section__flow" />
      </div>
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import Section from '../components/DemoSection.vue'
  import SubSection from '../components/DemoSubSection.vue'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import { Flow } from '@/models'
  import { mocker } from '@/services/Mocker'

  const flows: Flow[] = reactive([])

  for (let i = 0; i < 10; ++i) {
    flows[i] = mocker.create('flow', [{ created: mocker.create('date', [new Date('2021-10-05'), new Date()]) }])
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
  max-w-[400px]
}
</style>