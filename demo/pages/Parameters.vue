<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Parameters
      </h1>
    </template>

    <ParametersFormSection />
    <JsonEditorSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import JsonEditorSection from '../sections/JsonEditorSection.vue'
  import ParametersFormSection from '../sections/ParametersFormSection.vue'
</script>