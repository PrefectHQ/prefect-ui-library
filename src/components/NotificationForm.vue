<template>
  <p-form class="notification-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p class="notification-form__message">
      Choose which flow run states and tags trigger this notification.
    </p>
    <div class="notification-form__horizontal-fields">
      <p-label label="Run states">
        <StateSelect v-model:selected="stateNames" empty-message="All States" />
      </p-label>

      <p-label label="Tags (Optional)">
        <p-tags-input v-model:tags="tags" empty-message="All Tags" />
      </p-label>
    </div>

    <p-label label="Send notifications to">
      <p-button-group v-model="selectedSendToType" :options="buttonGroup" />
    </p-label>


    <p-label :label="selectedSendToLabel">
      <p-text-input v-model="input" />
    </p-label>

    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <NotificationDetails :notification="notificationDetails" :send-to-input="input" :send-to-type="selectedSendToType" />
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PTextInput, PForm, ButtonGroupOption, PButtonGroup } from '@prefecthq/prefect-design'
  import { useForm } from 'vee-validate'
  import { computed, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import NotificationDetails from './NotificationDetails.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { BlockDocumentCreate, Notification } from '@/models'
  import { notificationsRouteKey } from '@/router/routes'
  import { blockDocumentsApiKey, blockSchemasApiKey, blockTypesApiKey, notificationsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    notification?: Notification,
  }>()

  const router = useRouter()
  const notificationsRoute = inject(notificationsRouteKey)
  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockTypesApi = inject(blockTypesApiKey)
  const blockSchemasApi = inject(blockSchemasApiKey)
  const notificationsApi = inject(notificationsApiKey)

  const { handleSubmit, handleReset, isSubmitting } = useForm<Notification>({ initialValues: props.notification })
  const stateNames = ref(props.notification?.stateNames ? [...props.notification.stateNames] : [])
  const tags = ref(props.notification?.tags ? [...props.notification.tags] : [])

  const notificationDetails = computed(() => {
    return {
      stateNames: stateNames.value,
      tags: tags.value,
      blockDocumentId: props.notification?.blockDocumentId,
    }
  })

  const buttonGroup = [
    {
      label: 'Slack Webhook',
      value: 'Slack Webhook',
      inputLabel: 'Webhook URL',
      disabled: true,
    },
  ]

  const blockDocument = props.notification?.blockDocumentId ? await blockDocumentsApi.getBlockDocument(props.notification.blockDocumentId) : null
  const blockDocumentType = computed(()=> blockDocument?.blockType.name ?? '')
  const selectedSendToType = ref(blockDocumentType.value || buttonGroup[0].value)
  const blockDocumentDataKey = blockDocument?.data ? Object.keys(blockDocument.data)[0] : null
  const selectedSendToLabel = ref(blockDocumentDataKey ? blockDocumentDataKey : buttonGroup[0].inputLabel)

  watch(() => selectedSendToType.value, (current) => {
    selectedSendToLabel.value = buttonGroup.find((button: ButtonGroupOption) => button.value === current)!.inputLabel
  })

  const blockDocumentInputValue: string | string[] | undefined = blockDocumentDataKey ? blockDocument?.data[blockDocumentDataKey] as string | string[] : undefined
  const blockDocumentInputValueAsString = Array.isArray(blockDocumentInputValue) ? blockDocumentInputValue.join() : blockDocumentInputValue
  const input = ref(blockDocumentInputValueAsString ?? '')

  const emit = defineEmits<{
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit(() => {
    createNotification()
  })

  function cancel(): void {
    handleReset()
    emit('cancel')
    router.push(notificationsRoute())
  }

  const createNotification = async (): Promise<void>=> {
    try {
      const blockType = await blockTypesApi.getBlockTypeByName(selectedSendToType.value)
      const filter =  {
        blockTypeId: {
          any_: [blockType.id],
        },
        sort: 'CREATED_TIME_DESC',
        limit: 1,
      }
      const blockSchema = await blockSchemasApi.getBlockSchemas(filter)
      const blockDocument: BlockDocumentCreate = {
        is_anonymous: true,
        data: { [selectedSendToLabel.value]: input.value },
        blockSchemaId: blockSchema[0].id,
        blockTypeId: blockType.id,
      }
      const block = await blockDocumentsApi.createBlockDocument(blockDocument)
      const notification = { name:`${block.name}`, is_active: true, state_names: stateNames.value, tags: tags.value, block_document_id: block.id }
      await notificationsApi.createNotification(notification)
      router.push(notificationsRoute())
    } catch (error) {
      console.warn(error)
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
.notification-form__horizontal-fields {
  @apply
  flex
  gap-4
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