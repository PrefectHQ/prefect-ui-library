<template>
  <DemoSection heading="Parameters Modal">
    <p-content>
      <JsonView label="Parameters" :value="parameters" />

      <ParametersFormModal @submit="updateParameters">
        <template #default="{ open }">
          <div>
            <p-button size="sm" @click="open">
              Show parameters modal
            </p-button>
          </div>
        </template>
      </ParametersFormModal>
    </p-content>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonView from '@/components/JsonView.vue'
  import ParametersFormModal from '@/components/ParametersFormModal.vue'

  type Parameters = Record<string, unknown>

  const parameters = ref<string | null>(null)

  const updateParameters = (formParameters: Parameters): void => {
    parameters.value = JSON.stringify(formParameters)
  }
</script>