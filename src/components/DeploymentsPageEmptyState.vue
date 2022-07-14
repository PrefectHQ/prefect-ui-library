<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="empty-deployment--icon" />
      <p-icon icon="DotsHorizontalIcon" class="empty-deployment--icon" />
      <p-icon icon="LocationMarkerIcon" class="empty-deployment--icon" />
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
  import DocumentationButton from './DocumentationButton.vue'
</script>

<style>
.empty-deployment--icon { @apply
  w-12
  h-12
}

.empty-deployment--link { @apply
  text-state-running-600
  font-medium
}

.empty-deployment--link-icon { @apply
  ml-2
  w-4
  h-4
}
</style>