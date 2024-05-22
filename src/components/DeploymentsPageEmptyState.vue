<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" />
      <p-icon icon="EllipsisHorizontalIcon" />
      <p-icon icon="PDeployment" />
    </template>

    <template #heading>
      Create a deployment to get started
    </template>

    <template #description>
      Deployments elevate workflows from functions you call manually to API objects that can be remotely triggered.
    </template>

    <template #actions>
      <slot name="actions">
        <DocumentationButton :to="localization.docs.deployments" />
      </slot>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { localization } from '@/localization'
</script>
