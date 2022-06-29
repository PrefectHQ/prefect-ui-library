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

    <p-button-group v-model="selectedSendToType" :options="buttonGroup" />

    <BlockSchema v-slot="{ blockSchema }" :block-type-name="selectedSendToType">
      <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
    </BlockSchema>


    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <template v-if="notification">
        <BlockDocument v-slot="{ blockDocument }" :block-document-id="notification.blockDocumentId">
          <NotificationDetails
            :notification="notificationDetails"
            :block-type="blockDocument.blockType"
            :block-document-data="blockDocument.data"
          />
        </BlockDocument>
      </template>
      <template v-if="!notification">
        <BlockSchema v-slot="{ blockSchema }" :block-type-name="selectedSendToType">
          <NotificationDetails
            :notification="notificationDetails"
            :block-type="blockSchema.blockType"
            :block-document-data="blockDocumentData"
          />
        </BlockSchema>
      </template>
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PForm, PButtonGroup } from '@prefecthq/prefect-design'
  import { useForm, useField } from 'vee-validate'
  import { computed, ref } from 'vue'
  import BlockDocument from './BlockDocument.vue'
  import BlockSchema from './BlockSchema.vue'
  import BlockSchemaFormFields from './BlockSchemaFormFields.vue'
  import NotificationDetails from './NotificationDetails.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { BlockDocumentData, Notification } from '@/models'

  const props = defineProps<{
    notification?: Notification,
  }>()

  const initialStateNames = ref(props.notification?.stateNames ? [...props.notification.stateNames] : [])
  const initialTags = ref(props.notification?.tags ? [...props.notification.tags] : [])

  const { handleSubmit, isSubmitting } = useForm<Partial<Notification>>({
    initialValues: {
      stateNames: initialStateNames.value,
      tags: initialTags.value,
    },
  })

  const { value: tags } = useField<string[]>('tags')
  const { value: stateNames } = useField<string[]>('stateNames')

  const buttonGroup = [
    {
      label: 'Slack',
      value: 'Slack Webhook',
      inputLabel: 'Webhook URL',
    },
  ]

  const notificationDetails = computed(() => {
    return {
      stateNames: stateNames.value,
      tags: tags.value,
    }
  })

  const selectedSendToType = ref(buttonGroup[0].value)

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
    (event: 'submit', value: any): void,
    (event: 'cancel'): void,
  }>()

  const blockDocumentData = ref<BlockDocumentData>({ [selectedSendToType.value]: [] as BlockDocumentData[] })

  const dataModel = computed({
    get(): BlockDocumentData {
      return blockDocumentData.value
    },
    set(value: BlockDocumentData): void {
      blockDocumentData.value = value
    },
  })

  const submit = handleSubmit(notificationData => {
    emit('submit', notificationData)
  })

  function cancel(): void {
    emit('cancel')
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