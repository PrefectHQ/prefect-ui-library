<template>
  <DemoSection heading="Toggle">
    <DemoSubSection heading="Work Queues Toggle" class="mt-auto">
      <WorkQueueToggle v-model:workQueue="workQueue" />
    </DemoSubSection>

    <DemoSubSection heading="Deployments Toggle" class="mt-auto">
      <DeploymentToggle v-model:deployment="deployment" />
    </DemoSubSection>

    <DemoSubSection heading="Notifications Toggle" class="mt-auto">
      <NotificationToggle v-model:notification="notification" @update="handleUpdate" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import NotificationToggle from '@/components/NotificationToggle.vue'
  import WorkQueueToggle from '@/components/WorkQueueToggle.vue'
  import { mocker } from '@/services'

  const workQueue = ref(mocker.create('workQueue'))
  const deployment = ref(mocker.create('deployment'))
  const notification = ref(mocker.create('notification'))

  const handleUpdate = (): void => {
    const value = notification.value.isActive
    notification.value.isActive = !value
  }
</script>