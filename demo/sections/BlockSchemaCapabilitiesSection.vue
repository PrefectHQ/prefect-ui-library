<template>
  <DemoSection heading="Capabilities">
    <DemoSubSection heading="Tags">
      <BlockSchemaCapabilities :capabilities="blockSchemaCapabilities.slice()" />
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
  import { blockSchemaCapabilities } from '@/models/BlockSchema'

  const capability = ref(null)
</script>