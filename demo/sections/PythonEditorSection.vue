<template>
  <DemoSection heading="Python Editor">
    <p-content>
      <PythonView v-model="pythonRef" class="python-editor-section__view" />
    </p-content>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import PythonView from '@/components/JsonInput.vue'

  const pythonRef = ref('from prefect import flow, task')
</script>

<style>
.python-editor-section__view {
  min-height: 200px;
  resize: vertical;
}
</style>