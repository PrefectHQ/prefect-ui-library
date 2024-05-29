<template>
  <router-link :to="routes.deploymentFlowRunCreate(deployment.id, deployment.parametersV2)">
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