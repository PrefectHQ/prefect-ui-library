<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Detail">
      <NotificationDetails :notification="notification" send-to="alert-channel" />
      <p-divider />
      <NotificationDetails :notification="emptyNotification" send-to="alert@prefect.io" />
    </DemoSubSection>
    <DemoSubSection heading="Notification Table">
      <!--  -->
    </DemoSubSection>
    <DemoSubSection heading="Notification Form">
      <!--  -->
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import { Notification } from '@/models'
  import { mocker } from '@/services'

  const notification = mocker.create('notification')
  const emptyNotification: Notification = {
    blockDocumentId: mocker.create('id'),
    created: mocker.create('date'),
    id: mocker.create('id'),
    isActive: mocker.create('boolean'),
    name: 'very-important-notification',
    stateNames: [],
    tags: [],
    updated: mocker.create('date'),
  }
</script>