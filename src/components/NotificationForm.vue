<template>
  <p-form class="notification-form" :loading="isSubmitting" @submit="submit" @cancel="cancel">
    <p-label label="Run states">
      <p-combobox v-model="stateNames" :options="['Completed', 'Failed', 'Custom']" />
    </p-label>

    <p-label label="Tags (Optional)">
      <p-tags-input v-model:tags="tags" empty-message="Select tags..." />
    </p-label>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTextInput, PNumberInput, PTagsInput, PToggle, PForm } from '@prefecthq/prefect-design'
  import { useField, useForm } from 'vee-validate'
  import { computed, reactive, ref, watchEffect } from 'vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { Notification } from '@/models'
  import { isRequired, withMessage } from '@/services/validate'


  const props = defineProps<{
    notification?: Notification,
  }>()

  const { handleSubmit, isSubmitting, errors } = useForm<Notification>({ initialValues: props.notification })

  const { value: tags, meta: tagState } = useField<string[]>('tags')
  const { value: stateNames, meta: stateNamesState } = useField<string[]>('stateNames')


  const selectedStateNames = ref<any[]>([])

  const selected = computed({
    get() {
      return selectedStateNames.value
    },
    set(value: any | null | any[]) {
      selectedStateNames.value = value
    },
  })

  console.log(selected.value)


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