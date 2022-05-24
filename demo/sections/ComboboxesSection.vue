<template>
  <DemoSection heading="Filter Comboboxes" />
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'

  const multipleFlows = ref(true)
  const selectedFlow = ref(null)
  const selectedFlows = ref([])

  const flowsValue = computed({
    get() {
      return multipleFlows.value ? selectedFlows.value : selectedFlow.value
    },
    set(value: string | string[]) {
      if (multipleFlows.value && Array.isArray(value)) {
        selectedFlows.value = value
      } else {
        selectedFlow.value = value
      }
    },
  })

  const multipleDeployments = ref(true)
  const selectedDeployment = ref(null)
  const selectedDeployments = ref([])

  const deploymentsValue = computed({
    get() {
      return multipleDeployments.value ? selectedDeployments.value : selectedDeployment.value
    },
    set(value: string | string[]) {
      if (multipleDeployments.value && Array.isArray(value)) {
        selectedDeployments.value = value
      } else {
        selectedDeployment.value = value
      }
    },
  })

  function clear(): void {
    selectedFlow.value = null
    selectedFlows.value = []
  }
</script>

<style></style>