<template>
  <p-form class="block-schema-edit-form" @submit="submit">
    <p-content>
      <p-label label="Block Name" description="Block names are not editable">
        <p-text-input :model-value="name" disabled />
      </p-label>

      <SchemaFormFields :schema="blockSchema.fields" property="data" />
    </p-content>

    <template #footer>
      <p-button @click="cancel">
        Cancel
      </p-button>
      <SubmitButton />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import SubmitButton from '@/components/SubmitButton.vue'
  import { useForm } from '@/compositions/useForm'
  import { BlockDocumentUpdate } from '@/models'
  import { BlockSchema } from '@/models/BlockSchema'
  import { SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    blockSchema: BlockSchema,
    data: SchemaValues,
    name: string,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: BlockDocumentUpdate): void,
    (event: 'cancel'): void,
  }>()

  const { handleSubmit } = useForm<BlockDocumentUpdate>({
    initialValues: {
      data: props.data,
      blockSchema: props.blockSchema,
    },
  })

  const submit = handleSubmit(update => emit('submit', update))
  const cancel = (): void => emit('cancel')
</script>