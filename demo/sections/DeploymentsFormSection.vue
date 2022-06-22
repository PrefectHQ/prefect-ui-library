<template>
  <DemoSection heading="Deployment Form">
    <DeploymentForm :deployment="deployment" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import { Deployment } from '@/models'
  import { mocker } from '@/services/Mocker'

  const deployment = ref<Deployment>(mocker.create('deployment'))
</script>