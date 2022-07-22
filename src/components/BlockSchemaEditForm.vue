<template>
  <p-form class="block-schema-edit-form" @submit="submit">
    <p-content>
      <p-label label="Block Name" description="Block names are not editable">
        <p-text-input :model-value="name" disabled />
      </p-label>

      <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'
  import { computed } from 'vue'
  import BlockSchemaFormFields from './BlockSchemaFormFields.vue'
  import { BlockDocumentData } from '@/models/BlockDocument'
  import { BlockSchema } from '@/models/BlockSchema'

  const props = defineProps<{
    blockSchema: BlockSchema,
    data: BlockDocumentData,
    name: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
    (event: 'submit' | 'cancel'): void,
  }>()

  const { handleSubmit } = useForm()
  const submit = handleSubmit(() => emit('submit'))

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