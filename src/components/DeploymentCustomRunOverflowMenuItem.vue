<template>
  <router-link :to="routes.deploymentFlowRunCreate(deploymentId)">
    <p-overflow-menu-item>
      <slot>
        Custom run
      </slot>
    </p-overflow-menu-item>
  </router-link>
</template>

<script lang="ts" setup>
  import { useWorkspaceRoutes } from '@/compositions'

  defineProps<{
    deploymentId: string,
  }>()

  const routes = useWorkspaceRoutes()
</script>