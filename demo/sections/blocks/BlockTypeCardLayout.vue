<template>
  <ComponentPage title="BlockTypeCardLayout">
    <BlockTypeCardLayout :block-type="blockType" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockTypeCardLayout from '@/components/BlockTypeCardLayout.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockTypeMock } from '@/demo/compositions/useBlockTypeMock'

  const blockType = useBlockTypeMock()
</script>