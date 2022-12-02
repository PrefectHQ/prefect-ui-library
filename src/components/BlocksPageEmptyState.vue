<template>
  <p-empty-state class="blocks-page-empty-state">
    <template #icon>
      <p-icon icon="CubeIcon" />
    </template>

    <template #heading>
      Add a block to get started
    </template>

    <template #description>
      Blocks securely store credentials and configuration to connect to and use external systems.
    </template>

    <template #actions>
      <DocumentationButton topic="blocks" />
      <router-link v-if="can.create.block" :to="routes.blocksCatalog()">
        <p-button>
          Add Block
          <p-icon icon="PlusIcon" class="empty-work-queue--link-icon" />
        </p-button>
      </router-link>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from './DocumentationButton.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>