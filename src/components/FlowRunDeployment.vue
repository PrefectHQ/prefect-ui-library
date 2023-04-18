<template>
  <div v-if="deployment?.name" class="flow-run-list-item__relation">
    <span>Deployment</span> <DeploymentIconText :deployment-id="deploymentId" />
  </div>
</template>

<script lang="ts" setup>
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import { useDeployment } from '@/compositions'

  const props = defineProps<{
    deploymentId: string,
  }>()

  const { deployment } = useDeployment(props.deploymentId)
</script>
