<template>
  <template v-if="deployment?.can.read">
    <template v-if="deployment">
      <p-link :to="routes.deployment(deploymentId)" class="deployment-icon-text">
        <p-icon-text icon="PDeployment">
          <span class="deployment-icon-name">{{ deploymentName }}</span>
        </p-icon-text>
      </p-link>
    </template>
    <template v-else-if="subscription.executed">
      <span>
        Deployment not found
      </span>
    </template>
  </template>
  <template v-else>
    <span>
      No access
    </span>
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
  const { deployment, subscription } = useDeployment(deploymentId)
  const deploymentName = computed(() => deployment.value?.name)
</script>
