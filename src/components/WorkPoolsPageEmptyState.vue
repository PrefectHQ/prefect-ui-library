<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="CircleStackIcon" class="work-pools-page-empty-state__icon" />
    </template>

    <template #heading>
      Create a work pool to get started
    </template>

    <template #description>
      Work pools allow you to prioritize and manage deployment runs
      to be picked up by a corresponding agent.
    </template>
    <template #actions>
      <DocumentationButton :to="localization.docs.workPools" />
      <p-button v-if="can.create.work_pool" icon-append="PlusIcon" :to="routes.workPoolCreate()">
        Create Work Pool
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

<style>
.work-pools-page-empty-state__icon { @apply
  w-12
  h-12;
}
</style>