<template>
  <DemoSection heading="Notifications">
    <DemoSubSection heading="Notification Create">
      <NotificationForm @submit="submit" />
    </DemoSubSection>

    <DemoSubSection heading="Notification Edit">
      <!-- <NotificationForm :notification="notification" @submit="submit" /> -->
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { provide, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import NotificationForm from '@/components/NotificationForm.vue'
  import { Notification } from '@/models/Notification'
  import { blockDocumentsApiKey, blockSchemasApiKey, blockTypesApiKey, mocker } from '@/services'

  const emailBlockType = mocker.create('blockType', [{ name: 'Email Addresses' }])
  const emailBlockSchemaFields = mocker.create('schema', [{ blockTypeSlug: emailBlockType.slug }])
  const emailBlockSchema = mocker.create('blockSchema', [{ blockType: emailBlockType, blockTypeId: emailBlockType.id, fields: emailBlockSchemaFields }])


  const slackBlockType = mocker.create('blockType', [{ name: 'Slack Webhook' }])
  const slackBlockSchemaFields = mocker.create('schema', [{ blockTypeSlug: slackBlockType.slug }])
  const slackBlockSchema = mocker.create('blockSchema', [{ blockType: slackBlockType, blockTypeId: slackBlockType.id, fields: slackBlockSchemaFields } ])
  const slackBlockDocumentData = mocker.create('blockDocumentData', ['url'])


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

  function submit(notification: Partial<Notification>): void {
    console.log({ notification })
  }

  const blockSchemas = [emailBlockSchema, slackBlockSchema]

  provide(blockSchemasApiKey, mocker.create('blockSchemasApi', [{ blockSchemas }]))
  provide(blockDocumentsApiKey, blockDocumentsApi)
  provide(blockTypesApiKey, mocker.create('blockTypesApi', [{ blockTypes }]))

  const notification = ref(mocker.create('notification', [{ blockDocumentId: slackBlockDocument.id }]))
  </script>
