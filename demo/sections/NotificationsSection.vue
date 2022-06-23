<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Overflow Menu">
      <NotificationMenu :notification="notification" />
    </DemoSubSection>
    <DemoSubSection heading="Notification Detail">
      <NotificationDetails :notification="notification" send-to="alert-channel" />
      <p-divider />
      <NotificationDetails :notification="emptyNotification" send-to="alert@prefect.io" />
      <p-divider />
      <NotificationDetails :notification="customStateNotification" send-to="alert@prefect.io" />
    </DemoSubSection>
    <DemoSubSection heading="Notification Table">
      <NotificationsTable :notifications="notifications" />
    </DemoSubSection>
    <DemoSubSection heading="Notification Form">
      <!--  -->
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import NotificationMenu from '@/components/NotificationMenu.vue'
  import NotificationsTable from '@/components/NotificationsTable.vue'
  import { mocker } from '@/services'

  const notification = mocker.create('notification')
  const notifications = mocker.createMany('notification', 3)
  const emptyNotification = mocker.create('notification', [{ stateNames: [], tags: [] }])
  const customStateNotification = mocker.create('notification', [{ stateNames: ['failed', 'hazard', 'Retrying'] }])
</script>