<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Detail">
      <NotificationDetails :notification="notification" :block-type="emailBlockDocument.blockType" :data="emailBlockDocument.data" />
      <p-divider />
      <NotificationDetails :notification="emptyNotification" :block-type="emailBlockDocument.blockType" :data="emailBlockDocument.data" />
      <p-divider />
      <NotificationDetails :notification="customStateNotification" :block-type="emailBlockDocument.blockType" :data="emailBlockDocument.data" />
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Table">
      <NotificationsTable :notifications="notifications" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { provide, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import NotificationsTable from '@/components/NotificationsTable.vue'
  import { blockDocumentsApiKey, blockSchemasApiKey, blockTypesApiKey, mocker } from '@/services'

  const emailBlockType = mocker.create('blockType', [{ name: 'Email Addresses' }])
  const emailBlockSchemaFields = mocker.create('schema', [{ blockTypeSlug: emailBlockType.slug }])
  const emailBlockSchema = mocker.create('blockSchema', [{ blockType: emailBlockType, blockTypeId: emailBlockType.id, fields: emailBlockSchemaFields }])
  const emailBlockDocumentData = mocker.create('blockDocumentData')


  const slackBlockType = mocker.create('blockType', [{ name: 'Slack Webhook' }])
  const slackBlockSchemaFields = mocker.create('schema', [{ blockTypeSlug: slackBlockType.slug }])
  const slackBlockSchema = mocker.create('blockSchema', [{ blockType: slackBlockType, blockTypeId: slackBlockType.id, fields: slackBlockSchemaFields } ])
  const slackBlockDocumentData = mocker.create('blockDocumentData', ['url'])

  const emailBlockDocument = mocker.create('blockDocument', [
    {
      blockSchemaId: emailBlockSchema.id,
      blockSchema: emailBlockSchema,
      blockTypeId: emailBlockType.id,
      blockType: emailBlockType,
      data: emailBlockDocumentData,
    },
  ])
  const slackBlockDocument = mocker.create('blockDocument', [
    {
      blockSchemaId: slackBlockSchema.id,
      blockSchema: slackBlockSchema,
      blockTypeId: slackBlockType.id,
      blockType: slackBlockType,
      data: slackBlockDocumentData,
    },
  ])

  const blockDocuments = [slackBlockDocument]
  const blockTypes = [emailBlockType, slackBlockType]

  const blockDocumentsApi = mocker.create('blockDocumentsApi', [{ blockDocuments }])


  const blockSchemas = [emailBlockSchema, slackBlockSchema]

  provide(blockSchemasApiKey, mocker.create('blockSchemasApi', [{ blockSchemas }]))
  provide(blockDocumentsApiKey, blockDocumentsApi)
  provide(blockTypesApiKey, mocker.create('blockTypesApi', [{ blockTypes }]))

  const notification = ref(mocker.create('notification', [{ blockDocumentId: slackBlockDocument.id }]))
  const notifications = mocker.createMany('notification', 3, [{ blockDocumentId: slackBlockDocument.id }])
  const emptyNotification = mocker.create('notification', [{ stateNames: [], tags: [], blockDocumentId: slackBlockDocument.id }])
  const customStateNotification = mocker.create('notification', [{ stateNames: ['failed', 'hazard', 'Retrying'], blockDocumentId: slackBlockDocument.id }])
  </script>
