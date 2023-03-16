<template>
  <ComponentPage title="ColorModeSelect">
    <div class="h-96">
      <ColorModeSelect v-model:selected="activeColorMode" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ColorModeSelect from '@/components/ColorModeSelect.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { activeColorMode } from '@/demo/utilities/colorMode'
</script>