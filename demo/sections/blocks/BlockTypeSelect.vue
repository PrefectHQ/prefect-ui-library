<template>
  <ComponentPage title="BlockTypeSelect">
    <div class="h-64">
      <BlockTypeSelect v-model:selected="selected" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import BlockTypeSelect from '@/components/BlockTypeSelect.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockTypesMock } from '@/demo/compositions/useBlockTypeMock'

  const selected = ref(null)
  useBlockTypesMock(4)
</script>