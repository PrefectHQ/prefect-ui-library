<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="empty-flow--icon" />
    </template>

    <template #heading>
      Run a flow to get started
    </template>

    <template #description>
      Flows represent workflow logic and encapsulate dependencies between other Prefect objects.
      They are dynamically registered the first time they are run.
    </template>

    <template #actions>
      <DocumentationButton topic="flows" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
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
