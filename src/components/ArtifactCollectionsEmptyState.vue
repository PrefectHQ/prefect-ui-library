<template>
  <p-empty-state class="artifact-collections-empty-state">
    <template #icon>
      <p-icon icon="PhotographIcon" />
    </template>

    <template #heading>
      Create an artifact
    </template>

    <template #description>
      <!-- TODO: Update this copy and use localization -->
      Artifacts are byproducts of your runs; they can be anything from a markdown string to a table.
    </template>

    <template #actions>
      <!-- TODO: This documentation link doesn't exist yet so I've used a placeholder -->
      <DocumentationButton :to="localization.docs.artifacts" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
</script>
