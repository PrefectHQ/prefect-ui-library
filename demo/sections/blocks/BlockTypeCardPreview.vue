<template>
  <ComponentPage title="BlockTypeCardPreview">
    <BlockTypeCardPreview :block-type="blockType" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockTypeCardPreview from '@/components/BlockTypeCardPreview.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockTypeMock } from '@/demo/compositions/useBlockTypeMock'

  const blockType = useBlockTypeMock()
</script>