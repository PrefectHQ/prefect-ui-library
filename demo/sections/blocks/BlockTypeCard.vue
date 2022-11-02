<template>
  <ComponentPage title="BlockTypeCard">
    <BlockTypeCard :block-type="blockType" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockTypeCard from '@/components/BlockTypeCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockTypeMock } from '@/demo/compositions/useBlockTypeMock'

  const blockType = useBlockTypeMock()
</script>