<template>
  <ComponentPage title="ColorModeSelect">
    <div class="h-96">
      <ColorModeSelect v-model:selected="selected" />
    </div>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ColorModeSelect from '@/components/ColorModeSelect.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const selected = ref(null)
</script>