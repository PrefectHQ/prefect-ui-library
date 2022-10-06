<template>
  <p-form class="block-schema-create-form" @submit="submit">
    <p-content>
      <p-label label="Block Name" :message="nameError" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <SchemaFormFields :schema="blockSchema.fields" property="data" />
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Create" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useField, useForm } from 'vee-validate'
  import { watch, watchEffect } from 'vue'
  import SchemaFormFields from './SchemaFormFields.vue'
  import SubmitButton from './SubmitButton.vue'
  import { useReactiveForm } from '@/compositions'
  import { useSessionStorage } from '@/compositions/useSessionStorage'
  import { BlockDocumentCreateNamed } from '@/models/BlockDocumentCreate'
  import { BlockSchema } from '@/models/BlockSchema'
  import { getSchemaDefaultValues } from '@/services/schemas/utilities'
  import { session } from '@/services/storage'
  import { fieldRules, isHandle, isRequired } from '@/utilities/validation'

  const props = defineProps<{
    blockSchema: BlockSchema,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: BlockDocumentCreateNamed): void,
    (event: 'cancel'): void,
  }>()

  // eslint-disable-next-line vue/no-setup-props-destructure
  const storageKey = `block-schema-form-${props.blockSchema.id}`

  const { value: initialValues, remove: removeFromStorage, set: setStorageValue } = useSessionStorage(storageKey, {
    name: '',
    data: getSchemaDefaultValues(props.blockSchema.fields),
    blockSchema: props.blockSchema,
  })

  const { values, handleSubmit } = useForm<BlockDocumentCreateNamed>({
    initialValues: initialValues.value,
  })

  const { value: name, meta: nameState, errorMessage: nameError } = useField<string>('name', fieldRules('Name', isRequired, isHandle))

  watchEffect(() => setStorageValue(values))

  const submit = handleSubmit(value => {
    removeFromStorage()
    emit('submit', value)
  })

  const cancel = (): void => {
    removeFromStorage()
    emit('cancel')
  }
</script>