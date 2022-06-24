<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Detail">
      <NotificationDetails :notification="notification" />
      <p-divider />
      <NotificationDetails :notification="emptyNotification" />
      <p-divider />
      <NotificationDetails :notification="customStateNotification" />
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Table">
      <NotificationsTable :notifications="notifications" />
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Form">
      <NotificationForm v-model:notification="notification" @submit="submit" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import NotificationForm from '@/components/NotificationForm.vue'
  import NotificationsTable from '@/components/NotificationsTable.vue'
  import { Notification } from '@/models'
  import { mocker } from '@/services'

  const notification = mocker.create('notification')
  const notifications = mocker.createMany('notification', 3)
  const emptyNotification = mocker.create('notification', [{ stateNames: [], tags: [] }])
  const customStateNotification = mocker.create('notification', [{ stateNames: ['failed', 'hazard', 'Retrying'] }])

  const submit = (notification: Notification): void => {
    console.log('Form submitted!', notification)
  }
</script>
