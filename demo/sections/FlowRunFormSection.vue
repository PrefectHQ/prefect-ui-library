<template>
  <DemoSection heading="Flow Run Forms">
    <FlowRunCreateForm
      :deployment="deployment"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import FlowRunCreateForm from '@/components/FlowRunCreateForm.vue'
  import { Deployment } from '@/models'
  import { mocker } from '@/services/Mocker'

  const deployment = ref<Deployment>(mocker.create('deployment'))

  const handleSubmit = (): void => {
    showToast('Run created', 'success')
  }

  const handleCancel = (): void => {
    showToast('No run created')
  }
</script>