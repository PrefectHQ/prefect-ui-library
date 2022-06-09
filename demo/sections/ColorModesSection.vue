<template>
  <DemoSection heading="Color Modes">
    <ColorModeSelect v-model:selected="mode" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import ColorModeSelect from '@/components/ColorModeSelect.vue'
  import { ColorMode } from '@/types/ColorMode'
  import { applyColorModeClass } from '@/utilities/colorMode'

  const mode = ref<ColorMode>('default')

  watchEffect(() => applyColorModeClass(mode.value))
</script>