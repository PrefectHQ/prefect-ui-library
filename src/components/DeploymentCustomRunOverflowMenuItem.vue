<template>
  <router-link v-if="deployment" :to="routes.deploymentFlowRunCreate(deploymentId, deployment.rawParameters)">
    <p-overflow-menu-item>
      <slot>
        Custom run
      </slot>
    </p-overflow-menu-item>
  </router-link>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'
  import { useDeployment, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const { deploymentId } = toRefs(props)
  const routes = useWorkspaceRoutes()
  const { deployment } = useDeployment(deploymentId)
</script>