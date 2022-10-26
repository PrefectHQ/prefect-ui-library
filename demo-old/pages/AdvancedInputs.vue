<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Advanced Inputs
      </h1>
    </template>

    <JsonEditorSection />
    <PythonEditorSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import JsonEditorSection from '../sections/JsonEditorSection.vue'
  import PythonEditorSection from '../sections/PythonEditorSection.vue'
</script>