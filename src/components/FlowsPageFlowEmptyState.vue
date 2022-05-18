<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="w-12 h-12" />
    </template>

    <template #heading>
      Create a flow to get started
    </template>

    <template #description>
      Flows are the most basic Prefect object. They are containers for workflow logic and allow users to interact with and reason about the state of their workflows.
    </template>

    <template #actions>
      <a class="flow-page-link" :href="documentationLink" target="_blank">
        <p-button inset>
          View Docs
          <p-icon icon="ExternalLinkIcon" class="ml-2 w-4 h-4" />
        </p-button>
      </a>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import { computed } from 'vue'

  const documentationLink = computed(() => 'https://orion-docs.prefect.io/concepts/flows/')
</script>