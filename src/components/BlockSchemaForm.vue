<template>
  <p-form v-on="{ cancel, submit }">
    <p-content class="block-schema-form">
      <p-label label="Block Name">
        <p-text-input v-model="nameModel" />
      </p-label>

      <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
    </p-content>
  </p-form>
</template>

<script lang="ts" setup>
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
    (event: 'update:name', value: string): void,
    (event: 'submit' | 'cancel'): void,
  }>()

  const nameModel = computed({
    get(): string {
      return props.name
    },
    set(value: string): void {
      emit('update:name', value)
    },
  })

  const dataModel = computed({
    get(): BlockDocumentData {
      return props.data
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })

  function submit(): void {
    emit('submit')
  }

  function cancel(): void {
    emit('cancel')
  }
</script>