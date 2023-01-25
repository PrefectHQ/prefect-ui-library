<template>
  <p-empty-state class="blocks-page-empty-state">
    <template #icon>
      <p-icon icon="CubeIcon" />
    </template>

    <template #heading>
      Add a block to get started
    </template>

    <template #description>
      Blocks securely store credentials and configuration to easily
      manage connections to external systems.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.blocks" />
      <p-button v-if="can.create.block" :to="routes.blocksCatalog()">
        Add Block
        <p-icon icon="PlusIcon" class="empty-work-queue--link-icon" />
      </p-button>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>
