<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="empty-flow--icon" />
    </template>

    <template #heading>
      Create a flow to get started
    </template>

    <template #description>
      Flows are the most basic Prefect object. They are containers for workflow logic and allow users to interact with and reason about the state of their workflows.
    </template>

    <template #actions>
      <a :href="documentationLink" target="_blank">
        <p-button inset class="empty-flow--link ">
          View Docs
          <p-icon icon="ExternalLinkIcon" class="empty-flow--link-icon" />
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

<style>
.empty-flow--icon { @apply
  w-12
  h-12
}

.empty-flow--link { @apply
  text-state-running-600
  font-medium
}

.empty-flow--link-icon { @apply
  ml-2
  w-4
  h-4
}
</style>