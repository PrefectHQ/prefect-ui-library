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
    <NotificationsBlockSelector :block-document-id="notification?.blockDocumentId" />

    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <NotificationDetails :notification="notificationDetails" />
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PForm } from '@prefecthq/prefect-design'
  import { useField, useForm } from 'vee-validate'
  import { computed } from 'vue'
  import NotificationDetails from './NotificationDetails.vue'
  import NotificationsBlockSelector from './NotificationsBlockSelector.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { Notification } from '@/models'
  import { blockDocumentsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    notification?: Notification,
  }>()

  const { handleSubmit, isSubmitting } = useForm<Notification>({ initialValues: props.notification })

  const { value: tags } = useField<string[]>('tags')
  const { value: stateNames } = useField<string[]>('stateNames')


  const notificationDetails = computed(() => {
    if (!props.notification) {
      return {}
    }

    return {
      stateNames: stateNames.value,
      tags: tags.value,
      blockDocumentId: props.notification.blockDocumentId,
    }
  })


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