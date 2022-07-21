<template>
  <p-form @submit="submit">
    <p-content class="block-schema-form">
      <p-label label="Block Name" :message="errors.name" :state="nameState" error="test">
        <p-text-input v-model="nameModel" :state="nameState" />
      </p-label>

      <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit">
        {{ submitLabel(label) }}
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'
  import { computed } from 'vue'
  import BlockSchemaFormFields from './BlockSchemaFormFields.vue'
  import { useReactiveField } from '@/compositions'
  import { BlockDocumentData } from '@/models/BlockDocument'
  import { BlockSchema } from '@/models/BlockSchema'
  import { isRequired, withMessage } from '@/services'
  import { submitLabel } from '@/utilities/buttons'

  const props = defineProps<{
    blockSchema: BlockSchema,
    data: BlockDocumentData,
    name: string,
    label?: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
    (event: 'update:name', value: string): void,
    (event: 'submit' | 'cancel'): void,
  }>()

  const { handleSubmit, errors } = useForm()
  const submit = handleSubmit(() => emit('submit'))

  const nameModel = computed({
    get(): string {
      return props.name
    },
    set(value: string): void {
      emit('update:name', value)
    },
  })

  const { meta: nameState } = useReactiveField(nameModel, 'name', [withMessage(isRequired, 'Name is required')])

  const dataModel = computed({
    get(): BlockDocumentData {
      return props.data
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })

  function cancel(): void {
    emit('cancel')
  }
</script>