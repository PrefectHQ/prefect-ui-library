<template>
  <DemoSection heading="Searches">
    <DemoSubSection heading="Flow Runs Search">
      <SearchInput v-model="runSearchInput" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { SearchInput } from '@/components'

  const runSearchInput = ref<string | null | undefined>(null)
</script>