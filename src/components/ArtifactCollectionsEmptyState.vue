<template>
  <p-empty-state class="artifact-collections-empty-state">
    <template #icon>
      <p-icon icon="PhotoIcon" />
    </template>

    <template #heading>
      Create an artifact
    </template>

    <template #description>
      {{ localization.info.artifactsEmptyState }}
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.artifacts" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
</script>
