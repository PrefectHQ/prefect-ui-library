<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Detail">
      <NotificationDetails :notification="notification" :block-type="slackBlockDocument.blockType" :block-document-data="slackBlockDocument.data" />
      <p-divider />
      <NotificationDetails :notification="emptyNotification" :block-type="slackBlockDocument.blockType" :block-document-data="slackBlockDocument.data" />
      <p-divider />
      <NotificationDetails :notification="customStateNotification" :block-type="slackBlockDocument.blockType" :block-document-data="slackBlockDocument.data" />
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Table">
      <NotificationsTable :notifications="notifications" />
    </DemoSubSection>
    <br>
    <DemoSubSection heading="Notification Form - Create">
      <NotificationForm v-model:notification="createNotification" @submit="submit" />
    </DemoSubSection>

    <DemoSubSection heading="Notification Form - Edit">
      <NotificationForm v-model:notification="notification" @submit="submit" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { provide, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import NotificationForm from '@/components/NotificationForm.vue'
  import NotificationsTable from '@/components/NotificationsTable.vue'
  import { BlockDocumentData } from '@/models/BlockDocument'
  import { BlockType } from '@/models/BlockType'
  import { Notification } from '@/models/Notification'
  import { blockDocumentsApiKey, blockSchemasApiKey, blockTypesApiKey, mocker } from '@/services'

  const emailBlockType = mocker.create('blockType', [{ name: 'Email Addresses' }])
  const emailBlockSchemaFields = mocker.create('blockSchemaFields', [{ blockTypeName: emailBlockType.name }])
  const emailBlockSchema = mocker.create('blockSchema', [{ blockType: emailBlockType, blockTypeId: emailBlockType.id, fields: emailBlockSchemaFields }])
  const emailBlockDocumentData = mocker.create('blockDocumentData')


  const slackBlockType = mocker.create('blockType', [{ name: 'Slack Webhook' }])
  const slackBlockSchemaFields = mocker.create('blockSchemaFields', [{ blockTypeName: slackBlockType.name }])
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

  const createNotification = ref<Partial<Notification>>({})
  const createBlockType = ref<BlockType>()
  const createData = ref<BlockDocumentData>({})

  function submit(notification: Partial<Notification>): void {
    console.log({ notification })
  }

  const blockSchemas = [emailBlockSchema, slackBlockSchema]

  provide(blockSchemasApiKey, mocker.create('blockSchemasApi', [{ blockSchemas }]))
  provide(blockDocumentsApiKey, blockDocumentsApi)
  provide(blockTypesApiKey, mocker.create('blockTypesApi', [{ blockTypes }]))

  const notification = ref(mocker.create('notification', [{ blockDocumentId: slackBlockDocument.id }]))
  const notificationBlockType = ref(slackBlockType)
  const notificationBlockData = ref<BlockDocumentData>({ url: 'hello world' })
  const notifications = mocker.createMany('notification', 3, [{ blockDocumentId: slackBlockDocument.id }])
  const emptyNotification = mocker.create('notification', [{ stateNames: [], tags: [], blockDocumentId: slackBlockDocument.id }])
  const customStateNotification = mocker.create('notification', [{ stateNames: ['failed', 'hazard', 'Retrying'], blockDocumentId: slackBlockDocument.id }])
  </script>
