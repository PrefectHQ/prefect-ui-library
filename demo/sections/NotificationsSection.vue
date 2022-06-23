<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Overflow Menu">
      <NotificationMenu :notification="notification" />
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Detail">
      <NotificationDetails :notification="notification" send-to="alert-channel" />
      <p-divider />
      <NotificationDetails :notification="emptyNotification" send-to="alert@prefect.io" />
      <p-divider />
      <NotificationDetails :notification="customStateNotification" send-to="alert@prefect.io" />
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Table">
      <NotificationStatusSelect v-model:selected="searchTerm" />
      <!--  -->
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Form">
      <NotificationForm v-model:notification="notification" @submit="submit" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import NotificationForm from '@/components/NotificationForm.vue'
  import NotificationMenu from '@/components/NotificationMenu.vue'
  import NotificationStatusSelect from '@/components/NotificationStatusSelect.vue'
  import { Notification, NotificationStatus } from '@/models'
  import { mocker } from '@/services'

  const searchTerm = ref<NotificationStatus>('all')

  const notification = mocker.create('notification')
  const emptyNotification = mocker.create('notification', [{ stateNames: [], tags: [] }])
  const customStateNotification = mocker.create('notification', [{ stateNames: ['failed', 'hazard', 'Retrying'] }])

  const submit = (notification: Notification): void => {
    console.log('Form submitted!', notification)
  }
</script>