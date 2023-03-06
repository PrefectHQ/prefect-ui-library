<template>
  <ComponentPage title="StateSelect" :demos="demos">
    <div class="h-96 color-mode-default">
      <StateSelect v-model:selected="selected" />
      {{ selected }}
    </div>

    <template #multiple>
      <div class="h-96 color-mode-default">
        <StateSelect v-model:selected="multiple" />
        {{ multiple }}
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import StateSelect from '@/components/StateSelect.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Multiple' }]

  const selected = ref('scheduled')
  const multiple = ref(['Failed', 'Crashed'])
</script>