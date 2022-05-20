<template>
  <Section heading="Toggle">
    <SubSection heading="Work Queues Toggle" class="mt-auto">
      <WorkQueueToggle v-model:values="workQueue" />
    </SubSection>

    <SubSection heading="Deployments Toggle" class="mt-auto">
      <DeploymentToggle v-model:values="deployment" />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { mocker } from '@/services'

  const workQueue = ref(mocker.create('workQueue'))
  const deployment = ref(mocker.create('deployment'))
</script>