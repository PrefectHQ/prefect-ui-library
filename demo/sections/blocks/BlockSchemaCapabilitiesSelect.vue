<template>
  <ComponentPage title="BlockSchemaCapabilitiesSelect">
    <div class="h-96">
      <BlockSchemaCapabilitySelect v-model:selected="selected" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import BlockSchemaCapabilitySelect from '@/components/BlockSchemaCapabilitySelect.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockSchemaCapabilitiesMock } from '@/demo/compositions/useBlockSchemaCapabilitiesMock'

  useBlockSchemaCapabilitiesMock(8)

  const selected = ref(null)
</script>