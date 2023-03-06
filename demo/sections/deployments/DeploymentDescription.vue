<template>
  <ComponentPage title="Deployment description">
    <DeploymentDescription v-if="deployment.description" :description="deployment.description" />
    <DeploymentDescriptionEmptyState v-else :deployment="deployment" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import DeploymentDescription from '@/components/DeploymentDescription.vue'
  import DeploymentDescriptionEmptyState from '@/components/DeploymentDescriptionEmptyState.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const deployment = mocker.create('deployment')
</script>