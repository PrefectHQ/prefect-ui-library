<template>
  <ComponentPage title="LogoImage">
    <LogoImage :url="blockType.logoUrl" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import LogoImage from '@/components/LogoImage.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockTypeMock } from '@/demo/compositions/useBlockTypeMock'

  const blockType = useBlockTypeMock()
</script>