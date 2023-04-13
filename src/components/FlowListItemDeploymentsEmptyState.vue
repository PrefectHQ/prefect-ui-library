<template>
  <p-empty-state class="flow-list-item-deployments-empty-state">
    <template #icon>
      <p-icon icon="Flow" />
      <p-icon icon="DotsHorizontalIcon" />
      <p-icon icon="LocationMarkerIcon" />
    </template>

    <template #heading>
      Create a deployment to begin remotely managing <span class="flow-list-item-deployments-empty-state__flow-name">{{ flow.name }}</span>
    </template>

    <template #description>
      Deployments are API representations of flows and allow for their remote configuration and scheduling.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.deployments" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
  import { Flow } from '@/models'

  defineProps<{
    flow: Flow,
  }>()
</script>

<style>
.flow-list-item-deployments-empty-state,
.flow-list-item-deployments-empty-state .p-empty-state__text { @apply
  border-none
  bg-transparent
}

.flow-list-item-deployments-empty-state__flow-name { @apply
  font-bold
}
</style>