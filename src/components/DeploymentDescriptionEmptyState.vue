<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="MenuAlt2Icon" />
    </template>

    <template #heading>
      You haven't added a description to this deployment yet
    </template>

    <template #description>
      You can do so by modifying your deployment here or by adding it as part of your
      deployment manifest configuration.
    </template>

    <template #actions>
      <DocumentationButton topic="deployments" />
      <router-link v-if="can.update.deployment" :to="editDeploymentRoute(deployment.id)">
        <p-button>
          Add Description
        </p-button>
      </router-link>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from './DocumentationButton.vue'
  import { useCan } from '@/compositions/useCan'
  import { Deployment } from '@/models'
  import { editDeploymentRouteKey } from '@/router'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const can = useCan()
  const editDeploymentRoute = inject(editDeploymentRouteKey)
</script>