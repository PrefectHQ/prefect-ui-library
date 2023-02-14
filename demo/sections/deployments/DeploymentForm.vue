<template>
  <ComponentPage title="Deployment Form">
    <DeploymentForm :deployment="deployment" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import DeploymentForm from '@/components/DeploymentForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const deployment = mocker.create('deployment')
</script>