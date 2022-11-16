<template>
  <ComponentPage title="StateNameSelect" :demos="demos">
    <div class="h-96 color-mode-default">
      <StateNameSelect v-model:selected="selected" />
      {{ selected }}
    </div>

    <template #multiple>
      <div class="h-96 color-mode-default">
        <StateNameSelect v-model:selected="multiple" />
        {{ multiple }}
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Multiple' }]

  const selected = ref()
  const multiple = ref([])
</script>