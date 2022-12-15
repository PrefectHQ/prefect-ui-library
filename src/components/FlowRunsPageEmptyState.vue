<template>
  <p-empty-state class="flow-runs-page-empty-state">
    <template #icon>
      <p-icon icon="FlowRun" />
    </template>

    <template #heading>
      Run a flow to get started
    </template>

    <template #description>
      Flow runs represent the execution of flow and task functions in a script. Here you can see what was supposed to happen, what actually happened, and if there was a difference.
    </template>

    <template #actions>
      <DocumentationButton topic="gettingStarted">
        Get Started
      </DocumentationButton>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
</script>