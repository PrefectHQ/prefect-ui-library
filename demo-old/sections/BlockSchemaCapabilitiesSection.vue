<template>
  <DemoSection heading="Capabilities">
    <DemoSubSection heading="Tags">
      <BlockSchemaCapabilities :capabilities="capabilities" />
    </DemoSubSection>
    <DemoSubSection heading="Select">
      <BlockSchemaCapabilitySelect v-model:selected="capability" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockSchemaCapabilities from '@/components/BlockSchemaCapabilities.vue'
  import BlockSchemaCapabilitySelect from '@/components/BlockSchemaCapabilitySelect.vue'
  import { mocker } from '@/services'

  const capability = ref(null)
  const capabilities = mocker.create('blockSchemaCapabilities')
</script>