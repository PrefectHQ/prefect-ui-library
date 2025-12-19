<template>
  <BlockDocumentInput v-model="value" :block-type-slug="property.blockTypeSlug" :state="state" class="schema-form-property-block-document" />
</template>

<script lang="ts" setup>
  import { State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { BlockDocumentReferenceValue } from '@/schemas/types/schemaValues'
  import { Require } from '@/types/utilities'
  import { isNullish } from '@/utilities/variables'

  const props = defineProps<{
    property: Require<SchemaProperty, 'blockTypeSlug'>,
    value: BlockDocumentReferenceValue | undefined,
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [BlockDocumentReferenceValue | undefined],
  }>()

  const value = computed({
    get() {
      return props.value?.$ref?.block_document_id ?? null
    },
    set(value) {
      if (isNullish(value)) {
        emit('update:value', undefined)
        return
      }

      emit('update:value', {
        $ref: {
          block_document_id: value,
        },
      })
    },
  })
</script>