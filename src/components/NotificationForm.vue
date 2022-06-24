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

    <template v-if="selectedSendToType == 'email_addresses'">
      <p-label label="Addresses">
        <p-combobox v-model="selectedEmails" allow-unknown-value :options="[]" />
      </p-label>
    </template>
    <template v-if="selectedSendToType == 'slack'">
      <p-label label="Credentials">
        Select Block
      </p-label>
      <p-label label="Channel(s)">
      <!--  -->
      </p-label>
    </template>


    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <NotificationDetails :notification="notificationChanges" :send-to-input="selectedEmails" :send-to-type="selectedSendToType" />
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PForm, ButtonGroupOption, PCombobox, PButtonGroup } from '@prefecthq/prefect-design'
  import { useField, useForm } from 'vee-validate'
  import { computed, ref } from 'vue'
  import NotificationDetails from './NotificationDetails.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { Notification } from '@/models'
  import { blockDocumentsApiKey } from '@/services'
  import { inject } from '@/utilities'


  const props = defineProps<{
    notification?: Notification,
  }>()

  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockDocument = await blockDocumentsApi.getBlockDocument(props.notification!.blockDocumentId)
  const blockDocumentData = computed(() => blockDocument.data)
  const blockDocumentDataKey = computed(() => Object.keys(blockDocumentData.value)[0])
  const blockDocumentDataValue = computed(() => blockDocumentData.value[blockDocumentDataKey.value] as string[])


  const { handleSubmit, isSubmitting } = useForm<Notification>({ initialValues: props.notification })

  const { value: tags } = useField<string[]>('tags')
  const { value: stateNames } = useField<string[]>('stateNames')

  const notificationChanges = computed(() => {
    return {
      stateNames: stateNames.value,
      tags: tags.value,
    }
  })

  const buttonGroup: ButtonGroupOption[] = [
    {
      label: 'Email',
      value: 'email_addresses',
    },
    {
      label: 'Slack',
      value: 'slack',
    },
  ]
  const selectedSendToType = ref(buttonGroup[0].value)

  const selectedEmails = ref(selectedSendToType.value == blockDocumentDataKey.value && blockDocumentData.value[blockDocumentDataKey.value] ? blockDocumentData.value[blockDocumentDataKey.value] as string[]: [])


  const emit = defineEmits<{
    (event: 'submit', value: Notification): void,
    (event: 'cancel'): void,
  }>()

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

.notification-form__review-block {
  @apply
  border-[3px]
  border-prefect-100
  rounded-lg
  p-4
  pb-6
}
</style>