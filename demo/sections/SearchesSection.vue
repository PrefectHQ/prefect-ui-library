<template>
  <DemoSection heading="Searches">
    <DemoSubSection heading="Flow Runs Search">
      <RunsSearch v-model="runSearchInput" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { RunsSearch } from '@/components'

  const runSearchInput = ref<string | null | undefined>(null)
</script>