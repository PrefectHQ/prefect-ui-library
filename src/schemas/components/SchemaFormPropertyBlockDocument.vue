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

  const props = defineProps<{
    property: Require<SchemaProperty, 'blockTypeSlug'>,
    value: BlockDocumentReferenceValue | null | undefined,
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [BlockDocumentReferenceValue | null | undefined],
  }>()

  const value = computed({
    get() {
      return props.value?.$ref ?? null
    },
    set(value) {
      if (value === null) {
        emit('update:value', value)
        return
      }

      emit('update:value', {
        $ref: value,
      })
    },
  })
</script>