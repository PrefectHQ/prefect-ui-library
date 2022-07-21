<template>
  <p-empty-state class="flow-runs-page-empty-state">
    <template #icon>
      <p-icon icon="FlowRun" />
    </template>

    <template #heading>
      Run a flow to get started
    </template>

    <template #description>
      Prefect's flow runs let you see what was supposed to happen, what actually happen, and if there was a difference. Why.
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
  import DocumentationButton from './DocumentationButton.vue'
</script>