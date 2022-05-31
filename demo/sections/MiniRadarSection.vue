<template>
  <Section heading="Mini Radar">
    <div class="h-[200px] w-[200px]">
      <RadarSmall :flow-run-id="flowRun.id" />
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/DemoSection.vue'
  import RadarSmall from '@/components/RadarSmall.vue'
  import { mocker } from '@/services/Mocker'

  const flowRun = mocker.create('flowRun')
</script>
