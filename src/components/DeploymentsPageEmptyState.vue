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
      <a href="https://orion-docs.prefect.io/tutorials/deployments/" target="_blank">
        <p-button inset>
          Create Deployment
          <p-icon icon="ExternalLinkIcon" class="empty-deployment--link-icon" />
        </p-button>
      </a>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
</script>

<style>
.empty-deployment--icon { @apply
  w-12
  h-12
}

.empty-deployment--link-icon { @apply
  ml-2
  w-4
  h-4
}
</style>