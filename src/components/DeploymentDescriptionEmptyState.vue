<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Bars3BottomLeftIcon" />
    </template>

    <template #heading>
      Add deployment description
    </template>

    <template #description>
      You can do so by modifying your deployment here or by adding it as part of your
      deployment manifest configuration.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.deployments" />
      <p-button v-if="deployment.can.update" primary :to="routes.deploymentEdit(deployment.id)">
        Add Description
      </p-button>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'

  defineProps<{
    deployment: Deployment,
  }>()

  const routes = useWorkspaceRoutes()
</script>