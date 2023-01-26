<template>
  <p-empty-state class="flow-runs-page-empty-state">
    <template #icon>
      <p-icon icon="FlowRun" />
    </template>

    <template #heading>
      Run a flow to get started
    </template>

    <template #description>
      Flow runs represent the observed execution of a Prefect flow.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.gettingStarted">
        Get Started
      </DocumentationButton>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
</script>
