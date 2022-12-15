<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" />
      <p-icon icon="DotsHorizontalIcon" />
      <p-icon icon="LocationMarkerIcon" />
    </template>

    <template #heading>
      Create a deployment to get started
    </template>

    <template #description>
      Deployments are configurations for managing flows, whether you run them
      via the CLI, UI, or the API.
    </template>

    <template #actions>
      <DocumentationButton topic="deployments" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
</script>