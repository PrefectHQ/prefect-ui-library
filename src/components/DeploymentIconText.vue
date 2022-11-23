<template>
  <template v-if="can.read.deployment">
    <p-link :to="routes.deployment(deploymentId)" class="deployment-icon-text">
      <p-icon-text icon="LocationMarkerIcon">
        <span>{{ deploymentName }}</span>
      </p-icon-text>
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useCan, useWorkspaceRoutes } from '@/compositions'
  import { useDeployment } from '@/compositions/useDeployment'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
  const deploymentId = computed(() => props.deploymentId)
  const deployment = useDeployment(deploymentId)
  const deploymentName = computed(() => deployment.value?.name)
</script>