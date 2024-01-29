<template>
  <BlockDocumentInput v-model="value" :block-type-slug="property.block_type_slug" class="schema-form-property-block-document" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectBlockDocumentValue } from '@/schemas/types/schemaValues'
  import { Require } from '@/types/utilities'

  const props = defineProps<{
    property: Require<SchemaProperty, 'block_type_slug'>,
    value: PrefectBlockDocumentValue | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:value': [PrefectBlockDocumentValue | null | undefined],
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