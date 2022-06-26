<template>
  <p-form class="notification-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p class="notification-form__message">
      Choose which flow run states and tags trigger this notification.
    </p>
    <p-label label="Run states">
      <StateSelect v-model:selected="stateNames" empty-message="All States" />
    </p-label>

    <p-label label="Tags (Optional)">
      <p-tags-input v-model:tags="tags" empty-message="All Tags" />
    </p-label>

    <p-label label="Send notifications to">
      <p-button-group v-model="selectedSendToType" :options="buttonGroup" />
    </p-label>


    <p-label :label="selectedSendToLabel">
      <p-text-input v-model="input" />
    </p-label>

    <!--
      <p-label label="Webhook Name">
      <p-text-input v-model="input" />
      </p-label>
    -->

    <!-- <NotificationsBlockSelector :block-document-id="notification?.blockDocumentId" /> -->

    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <NotificationDetails :notification="notificationDetails" :send-to-input="input" :send-to-type="selectedSendToType" />
      <!-- <NotificationDetails :notification="notificationDetails" /> -->
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PTextInput, PForm, ButtonGroupOption, PCombobox, PButtonGroup } from '@prefecthq/prefect-design'
  import { useForm } from 'vee-validate'
  import { computed, ref, watch } from 'vue'
  import NotificationDetails from './NotificationDetails.vue'
  import NotificationsBlockSelector from './NotificationsBlockSelector.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { Notification } from '@/models'
  import { blockDocumentsApiKey, blockSchemasApiKey, blockTypesApiKey, notificationsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    notification?: Notification,
  }>()

  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockTypesApi = inject(blockTypesApiKey)
  const blockSchemasApi = inject(blockSchemasApiKey)
  const notificationsApi = inject(notificationsApiKey)
  // const blockDocument = await blockDocumentsApi.getBlockDocument(props.notification!.blockDocumentId)
  // const blockDocumentData = computed(() => blockDocument.data)
  // const blockDocumentDataKey = computed(() => Object.keys(blockDocumentData.value)[0])
  // const blockDocumentDataValue = computed(() => blockDocumentData.value[blockDocumentDataKey.value] as string[])


  const { handleSubmit, isSubmitting } = useForm<Notification>({ initialValues: props.notification })

  const stateNames = ref(props.notification?.stateNames ? [...props.notification.stateNames] : [])
  const tags = ref(props.notification?.tags ? [...props.notification.tags] : [])

  const notificationDetails = computed(() => {
    return {
      stateNames: stateNames.value,
      tags: tags.value,
    }
  })

  const buttonGroup: any[] = [
    {
      label: 'Email',
      value: 'email_addresses',
      inputLabel: 'Email Address',
    },
    {
      label: 'Slack Webhook',
      value: 'Slack Webhook',
      inputLabel: 'Webhook URL',
    },
  ]
  const selectedSendToType = ref(buttonGroup[0].value)
  const selectedSendToLabel =ref(buttonGroup[0].inputLabel)

  watch(() => selectedSendToType.value, (current) => {
    selectedSendToLabel.value = buttonGroup.find((button: ButtonGroupOption) => button.value === current).inputLabel
  })


  const input = ref('')

  // const input = ref(selectedSendToType.value == blockDocumentDataKey.value && blockDocumentData.value[blockDocumentDataKey.value] ? blockDocumentData.value[blockDocumentDataKey.value] as string[]: [])


  const emit = defineEmits<{
    (event: 'submit', value: any): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit(() => {
    const notificationData = {
      type: selectedSendToType.value,
      data: { [selectedSendToLabel.value]: input.value },
    }
    console.log('notificationData', notificationData)
    // emit('submit', notificationData)
    createNotification(notificationData)
  })
  function cancel(): void {
    emit('cancel')
  }

  const createNotification = async (ev: any): Promise<void>=> {
    try {
      console.log('e', ev)
      const blockType = await blockTypesApi.getBlockTypeByName(ev.type)
      const filter =  {
        blockTypeId: {
          any_: [blockType.id],
        },
        sort: 'CREATED_TIME_DESC',
        limit: 10,
      }
      const blockSchema = await blockSchemasApi.getBlockSchemas(filter)
      const blockDoc: any = {
        is_anonymous: true,
        data: ev.data,
        blockSchemaId: blockSchema[0].id,
        blockTypeId: blockType.id,

      }
      const block = await blockDocumentsApi.createBlockDocument(blockDoc)
      console.log(block)
      const notification = { name:`2${block.name}`, is_active: true, state_names: stateNames.value, tags: tags.value, block_document_id: block.id }
      const notificationRes = await notificationsApi.createNotification(notification)
      console.log(notificationRes)
    } catch (e) {
      console.warn(e)
    }
  }
</script>

<style>
.notification-form {
  @apply
  border-[1px]
  border-gray-300
  p-6
  rounded-lg
}

.notification-form__message {
  @apply
  text-base
  text-gray-500
}

.notification-form__review-block {
  @apply
  border-[3px]
  border-prefect-100
  rounded-lg
  p-4
  pb-6
}
</style>