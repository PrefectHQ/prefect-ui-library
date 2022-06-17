<template>
  <p-empty-state class="blocks-page-empty-state">
    <template #icon>
      <p-icon icon="CubeIcon" />
    </template>

    <template #heading>
      Create a block to get started
    </template>

    <template #description>
      Blocks securely store credentials and configuration to connect to and use external systems.
    </template>

    <template #actions>
      <router-link :to="blockCatalogRoute()">
        <p-button>
          Create a Block
          <p-icon icon="PlusIcon" class="empty-work-queue--link-icon" />
        </p-button>
      </router-link>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import { blockCatalogRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const blockCatalogRoute = inject(blockCatalogRouteKey)
</script>