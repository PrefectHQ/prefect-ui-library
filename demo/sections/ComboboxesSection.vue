<template>
  <DemoSection heading="Filter Comboboxes">
    <DemoSubSection heading="Flows">
      <FlowCombobox v-model:selected="flowsValue" empty-message="All Flows" />
      {{ JSON.stringify(flowsValue) }}
      <p-checkbox v-model="multipleFlows" label="Multiple" @update:model-value="clearFlows" />
    </DemoSubSection>
    <DemoSubSection heading="Deployments">
      <DeploymentCombobox v-model:selected="deploymentsValue" empty-message="All Deployments" />
      {{ JSON.stringify(deploymentsValue) }}
      <p-checkbox v-model="multipleDeployments" label="Multiple" @update:model-value="clearDeployments" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { PCheckbox } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import FlowCombobox from '@/components/FlowCombobox.vue'

  const multipleFlows = ref(true)
  const selectedFlow = ref<string | null>(null)
  const selectedFlows = ref<string[]>([])

  const flowsValue = computed({
    get() {
      return multipleFlows.value ? selectedFlows.value : selectedFlow.value
    },
    set(value: string | string[] | null) {
      if (Array.isArray(value)) {
        selectedFlows.value = value
      } else {
        selectedFlow.value = value
      }
    },
  })

  const multipleDeployments = ref(true)
  const selectedDeployment = ref<string | null>(null)
  const selectedDeployments = ref<string[]>([])

  const deploymentsValue = computed({
    get() {
      return multipleDeployments.value ? selectedDeployments.value : selectedDeployment.value
    },
    set(value: string | string[] | null) {
      if (Array.isArray(value)) {
        selectedDeployments.value = value
      } else {
        selectedDeployment.value = value
      }
    },
  })

  function clearFlows(): void {
    selectedFlow.value = null
    selectedFlows.value = []
  }

  function clearDeployments(): void {
    selectedDeployment.value = null
    selectedDeployments.value = []
  }
</script>