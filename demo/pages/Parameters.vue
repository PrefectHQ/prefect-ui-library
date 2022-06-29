<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Parameters
      </h1>
    </template>

    <JsonEditorSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import JsonEditorSection from '../sections/JsonEditorSection.vue'
</script>