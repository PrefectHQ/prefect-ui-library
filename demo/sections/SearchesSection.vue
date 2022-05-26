<template>
  <DemoSection heading="Searches">
    <DemoSubSection heading="Runs Search">
      <SearchInput v-model="runSearchInput" />
    </DemoSubSection>
    <DemoSubSection heading="Flows Search">
      <FlowSearch v-model="flows" />
      <FlowsTable :flows="flows" class="mt-2" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import { SearchInput, FlowSearch, FlowsTable } from '@/components'
  import { Flow } from '@/models'
  import { mocker } from '@/services'

  const flowsData = mocker.createMany('flow', 3)

  const runSearchInput = ref<string | null | undefined>(null)
  const filteredFlowList=ref<Flow[] | null>(null)
  const flows = computed<Flow[]>({
    get() {
      return filteredFlowList.value ?? flowsData
    },
    set(value: Flow[] | null) {
      filteredFlowList.value = value
    },
  })
</script>