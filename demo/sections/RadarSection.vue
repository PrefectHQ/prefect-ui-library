<template>
  <Section heading="Radar">
    <template #heading>
      Radar
      <p-button class="ml-2" size="sm" @click="generateData">
        Regenerate Data
      </p-button>
    </template>

    <div class="h-screen w-full">
      <RadarApp :flow-run-id="flowRun.id" />
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/DemoSection.vue'
  import RadarApp from '@/components/RadarApp.vue'
  import { mocker } from '@/services/Mocker'

  const flowRun = ref(mocker.create('flowRun'))

  const generateData = (): void => {
    flowRun.value = mocker.create('flowRun')
  }
</script>
