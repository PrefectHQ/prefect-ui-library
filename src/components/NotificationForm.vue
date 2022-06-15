<template>
  <p-form class="notification-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p class="notification-form__message">
      Choose which flow run states and tags trigger this notification.
    </p>
    <p-label label="Run states">
      <StateSelect v-model:selected="stateNames" empty-message="All Tags" />
    </p-label>

    <p-label label="Tags (Optional)">
      <p-tags-input v-model:tags="tags" empty-message="Select tags..." />
    </p-label>

    <p-label label="Send notifications to">
      <!--  -->
    </p-label>

    <p-label label="Addresses">
      <!--  -->
    </p-label>

    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <p>If a run of any flow with a ________ tag enters a _______ state, send a notification to __________</p>
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PForm } from '@prefecthq/prefect-design'
  import { useField, useForm } from 'vee-validate'
  import StateSelect from '@/components/StateSelect.vue'
  import { Notification } from '@/models'

  const props = defineProps<{
    notification?: Notification,
  }>()

  const { handleSubmit, isSubmitting } = useForm<Notification>({ initialValues: props.notification })

  const { value: tags } = useField<string[]>('tags')
  const { value: stateNames } = useField<string[]>('stateNames')

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