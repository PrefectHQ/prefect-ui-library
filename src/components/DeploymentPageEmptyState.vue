<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="w-12 h-12" />
      <p-icon icon="DotsHorizontalIcon" class="w-12 h-12" />
      <p-icon icon="LocationMarkerIcon" class="w-12 h-12" />
    </template>

    <template #heading>
      Create a deployment to get started
    </template>

    <template #description>
      Deployments are configurations for managing flows, whether you run them
      via the CLI, UI, or the API.
    </template>

    <template #actions>
      <a class="deployment-page-link" :href="documentationLink" target="_blank">
        <p-button inset>
          Create Deployment
          <p-icon icon="ExternalLinkIcon" class="ml-2 w-4 h-4" />
        </p-button>
      </a>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'

  import { computed } from 'vue'
  const documentationLink = computed(() => 'https://orion-docs.prefect.io/tutorials/deployments/')
</script>