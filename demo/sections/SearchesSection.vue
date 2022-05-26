<template>
  <DemoSection heading="Searches">
    <DemoSubSection heading="Runs Search">
      <SearchInput v-model="runSearchInput" />
    </DemoSubSection>
    <DemoSubSection heading="Flows Search">
      <FlowSearch v-model="flowSearchInput" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { SearchInput, FlowSearch } from '@/components'
  import { Flow } from '@/models'
  import { mocker } from '@/services'

  const flowsData = mocker.createMany('flow', 8)

  const runSearchInput = ref<string | null | undefined>(null)
  const flowSearchInput = ref<Flow[]>(flowsData)
</script>