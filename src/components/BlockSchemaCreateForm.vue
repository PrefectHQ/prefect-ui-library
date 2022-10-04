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
  import SchemaFormFields from './SchemaFormFields.vue'
  import SubmitButton from './SubmitButton.vue'
  import { BlockDocumentCreateNamed } from '@/models/BlockDocumentCreate'
  import { BlockSchema } from '@/models/BlockSchema'
  import { getSchemaDefaultValues } from '@/services/schemas/utilities'
  import { fieldRules, isHandle, isRequired } from '@/utilities/validation'

  const props = defineProps<{
    blockSchema: BlockSchema,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: BlockDocumentCreateNamed): void,
    (event: 'cancel'): void,
  }>()

  const { handleSubmit } = useForm<BlockDocumentCreateNamed>({
    initialValues: {
      name: '',
      data: getSchemaDefaultValues(props.blockSchema.fields),
      blockSchema: props.blockSchema,
    },
  })

  const { value: name, meta: nameState, errorMessage: nameError } = useField<string>('name', fieldRules('Name', isRequired, isHandle))

  const submit = handleSubmit(value => emit('submit', value))
  const cancel = (): void => emit('cancel')
</script>