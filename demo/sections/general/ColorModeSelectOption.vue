<template>
  <ComponentPage title="ColorModeSelectOption">
    <ColorModeSelectOption :mode="mode" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ColorModeSelectOption from '@/components/ColorModeSelectOption.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { ColorMode } from '@/types'

  const mode: ColorMode = 'achromatopsia'
</script>