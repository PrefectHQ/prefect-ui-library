<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="MenuAlt2Icon" />
    </template>

    <template #heading>
      You haven't added a description of this deployment yet
    </template>

    <template #description>
      You can do so by modifying your deployment here or by adding it as part of your
      deployment manifest configuration.
    </template>

    <template #actions>
      <DocumentationButton topic="deployments" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from './DocumentationButton.vue'
</script>