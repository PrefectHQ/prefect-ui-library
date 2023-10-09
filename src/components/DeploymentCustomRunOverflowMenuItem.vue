<template>
  <router-link :to="routes.deploymentFlowRunCreate(deployment.id, deployment.rawParameters)">
    <p-overflow-menu-item>
      <slot>
        Custom run
      </slot>
    </p-overflow-menu-item>
  </router-link>
</template>

<script lang="ts" setup>
  import { useWorkspaceRoutes } from '@/compositions'
  import { Deployment } from '@/models'

  defineProps<{
    deployment: Deployment,
  }>()

  const routes = useWorkspaceRoutes()
</script>