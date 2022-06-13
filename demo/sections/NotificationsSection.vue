<template>
  <DemoSection heading="Notifications">
    <div class="flex flex-wrap gap-8">
      <DemoSubSection heading="Notification Detail">
        <NotificationDetails :notification="notification" send-to="alert-channel" />
        <p-divider />
        <NotificationDetails :notification="emptyNotification" send-to="alert@prefect.io" />
      </DemoSubSection>
    </div>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import { mocker } from '@/services'

  const notification = mocker.create('notification')
  const emptyNotification = {
    blockDocumentId: '0987654',
    created: mocker.create('date'),
    id: '1234567889',
    isActive: false,
    name: 'very-important-notification',
    states: [],
    tags: [],
    updated: mocker.create('date'),
  }
</script>