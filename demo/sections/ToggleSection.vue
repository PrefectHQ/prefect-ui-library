<template>
  <DemoSection heading="Toggle">
    <DemoSubSection heading="Work Queues Toggle" class="mt-auto">
      <WorkQueueToggle v-model:values="workQueue" />
    </DemoSubSection>

    <DemoSubSection heading="Deployments Toggle" class="mt-auto">
      <DeploymentToggle v-model:values="deployment" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { mocker } from '@/services'

  const workQueue = ref(mocker.create('workQueue'))
  const deployment = ref(mocker.create('deployment'))
</script>