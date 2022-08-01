<template>
  <DemoSection heading="Deployment Form">
    <DeploymentForm :deployment="deployment" :flow-id="deployment.flowId" @submit="handleSubmit" @cancel="handleCancel" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DeploymentForm from '@/components/DeploymentForm.vue'
  import { Deployment } from '@/models'
  import { mocker } from '@/services/Mocker'

  const deployment = ref<Deployment>(mocker.create('deployment'))

  console.log(deployment)


  const handleSubmit = (): void => {
    showToast('Deployment updated', 'success')
  }

  const handleCancel = (): void => {
    showToast('Deployment unchanged')
  }
</script>