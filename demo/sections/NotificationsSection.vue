<template>
  <DemoSection heading="Notifications">
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
  import { provide } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import NotificationsTable from '@/components/NotificationsTable.vue'
  import { blockDocumentsApiKey, mocker } from '@/services'

  const blockDocuments = mocker.createMany('blockDocument', 5)
  const [first, second, third, forth ] = blockDocuments

  provide(blockDocumentsApiKey, mocker.create('blockDocumentsApi', [
    {
      blockDocuments,
    },
  ]))

  const notification = mocker.create('notification', [{ blockDocumentId: first.id }])

  const notifications = mocker.createMany('notification', 3, [{ blockDocumentId: forth.id }])
  const emptyNotification = mocker.create('notification', [{ stateNames: [], tags: [], blockDocumentId: second.id }])
  const customStateNotification = mocker.create('notification', [{ stateNames: ['failed', 'hazard', 'Retrying'], blockDocumentId: third.id }])
</script>
