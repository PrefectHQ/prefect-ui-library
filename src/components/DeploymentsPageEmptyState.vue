<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" />
      <p-icon icon="DotsHorizontalIcon" />
      <p-icon icon="LocationMarkerIcon" />
    </template>

    <template #heading>
      Create a deployment to begin remotely managing your flows
    </template>

    <template #description>
      Deployments are API representations of flows and allow for their remote configuration and scheduling.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.deployments" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
</script>
