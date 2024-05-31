<template>
  <p-empty-state class="flow-runs-page-empty-state">
    <template #icon>
      <p-icon icon="FlowRun" />
    </template>

    <template #heading>
      Run a task or flow to get started
    </template>

    <template #description>
      Runs store the state history for each execution of a task or flow.
    </template>

    <template #actions>
      <slot name="actions">
        <DocumentationButton :to="localization.docs.gettingStarted">
          Get Started
        </DocumentationButton>
      </slot>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
</script>
