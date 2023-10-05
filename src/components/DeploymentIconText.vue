<template>
  <template v-if="deployment?.can.read">
    <p-link :to="routes.deployment(deploymentId)" class="deployment-icon-text">
      <p-icon-text icon="MapPinIcon">
        <span>{{ deploymentName }}</span>
      </p-icon-text>
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useDeployment } from '@/compositions/useDeployment'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const routes = useWorkspaceRoutes()
  const deploymentId = computed(() => props.deploymentId)
  const { deployment } = useDeployment(deploymentId)
  const deploymentName = computed(() => deployment.value?.name)
</script>