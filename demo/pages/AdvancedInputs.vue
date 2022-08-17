<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Advanced Inputs
      </h1>
    </template>

    <JsonEditorSection />
    <PythonEditorSection />
    <MarkdownEditorSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import JsonEditorSection from '../sections/JsonEditorSection.vue'
  import MarkdownEditorSection from '../sections/MarkdownEditorSection.vue'
  import PythonEditorSection from '../sections/PythonEditorSection.vue'
</script>