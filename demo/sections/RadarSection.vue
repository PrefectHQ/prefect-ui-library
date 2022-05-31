<template>
  <Section heading="Radar">
    <div class="h-screen w-full">
      <RadarApp :flow-run-id="flowRun.id" />
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/DemoSection.vue'
  import RadarApp from '@/components/RadarApp.vue'
  import { mocker } from '@/services/Mocker'

  const flowRun = mocker.create('flowRun')
</script>
